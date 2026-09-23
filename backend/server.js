const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

// Path to products.json
const productsPath = path.join(__dirname, "../data/products.json");

// Load products from JSON file
function getProducts() {
    const data = fs.readFileSync(productsPath, "utf8");
    return JSON.parse(data);
}

// GET all products
app.get("/products", (req, res) => {
    try {
        const products = getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Failed to load products" });
    }
});

// GET single product by ID
app.get("/products/:id", (req, res) => {
    try {
        const products = getProducts();
        const product = products.find(p => p.id === parseInt(req.params.id));

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to load product" });
    }
});

// Start server
app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
});
