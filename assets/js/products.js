let products = [];

async function fetchProducts() {
    const res = await fetch("http://localhost:3000/products");
    products = await res.json();
}
