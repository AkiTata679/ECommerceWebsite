const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
app.use(cors());

// Connect to SQLite database
const dbPath = path.join(__dirname, "../database/store.db");
const db = new sqlite3.Database(dbPath);

// GET all products
app.get("/products", (req, res) => {
    const query = "SELECT * FROM products";

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Failed to load products" });
        }
        res.json(rows);
    });
});

// GET single product
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

app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
});
