const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

// Load products JSON
const productsPath = path.join(__dirname, "data", "products.json");

function getProducts() {
    const data = fs.readFileSync(productsPath, "utf8");
    return JSON.parse(data);
}

// GET all products
app.get("/products", (req, res) => {
    res.json(getProducts());
});

// GET single product
app.get("/products/:id", (req, res) => {
    const products = getProducts();
    const product = products.find(p => p.id === parseInt(req.params.id));

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
});

app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
});
