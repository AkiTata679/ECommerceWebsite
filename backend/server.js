const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json()); // allows JSON POST bodies

// Connect to SQLite database
const dbPath = path.join(__dirname, "../database/store.db");
const db = new sqlite3.Database(dbPath);

// ----------------------
// GET ALL PRODUCTS
// ----------------------
app.get("/products", (req, res) => {
    const query = "SELECT * FROM products";

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Failed to load products" });
        }
        res.json(rows);
    });
});

// ----------------------
// GET SINGLE PRODUCT
// ----------------------
app.get("/products/:id", (req, res) => {
    const query = "SELECT * FROM products WHERE id = ?";
    const id = req.params.id;

    db.get(query, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Failed to load product" });
        }
        if (!row) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(row);
    });
});

// ----------------------
// CREATE ORDER
// ----------------------
app.post("/orders", (req, res) => {
    const { name, email, address, cart, total } = req.body;

    if (!name || !email || !address || !cart || !total) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const query = `
        INSERT INTO orders (customer_name, customer_email, customer_address, cart_json, total)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
        query,
        [name, email, address, JSON.stringify(cart), total],
        function (err) {
            if (err) {
                return res.status(500).json({ error: "Failed to save order" });
            }

            res.json({ success: true, orderId: this.lastID });
        }
    );
});

// ----------------------
// START SERVER
// ----------------------
app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
});
