let products = [];

// Fetch products from Node.js backend
async function fetchProducts() {
    try {
        const res = await fetch("http://localhost:3000/products");
        products = await res.json();
    } catch (error) {
        console.error("Failed to load products:", error);
    }
}

// Load featured products (homepage)
async function loadFeatured() {
    await fetchProducts();

    const container = document.getElementById("featured-products");
    if (!container) return;

    container.innerHTML = "";

    products.slice(0, 3).forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>

            <button class="btn-secondary"
                onclick="window.location.href='productdetails.html?id=${product.id}'">
                View Details
            </button>
        `;

        container.appendChild(card);
    });
}

// Load all products (products page)
async function loadProducts() {
    await fetchProducts();

    const container = document.getElementById("product-list");
    if (!container) return;

    container.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>

            <button class="btn-secondary"
                onclick="window.location.href='productdetails.html?id=${product.id}'">
                View Details
            </button>
        `;

        container.appendChild(card);
    });
}

// Load product details page
async function loadProductDetails() {
    await fetchProducts();

    const container = document.getElementById("product-details");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    const product = products.find(p => p.id === id);

    if (!product) {
        container.innerHTML = "<p>Product not found.</p>";
        return;
    }

    container.innerHTML = `
        <div class="details-wrapper">
            <img src="${product.image}" class="details-image">

            <div class="details-info">
                <h2>${product.name}</h2>
                <p class="price">$${product.price}</p>
                <p class="desc">${product.description}</p>

                <button class="btn-primary" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Auto-run correct loader depending on page
document.addEventListener("DOMContentLoaded", () => {
    loadFeatured();
    loadProducts();
    loadProductDetails();
});
