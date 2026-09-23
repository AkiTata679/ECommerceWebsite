// -----------------------------
// PRODUCT DATA
// -----------------------------
const products = [
    {
        id: 1,
        name: "Samsung Galaxy S25 Ultra",
        price: 1199,
        image: "../assets/images/s25ultra.png",
        description: "The latest Samsung flagship with incredible camera performance."
    },
    {
        id: 2,
        name: "iPhone 16 Pro Max",
        price: 1299,
        image: "../assets/images/iphone16promax.png",
        description: "Apple’s newest powerhouse with A18 chip and titanium frame."
    },
    {
        id: 3,
        name: "Google Pixel 9 Pro",
        price: 1099,
        image: "../assets/images/pixel9pro.png",
        description: "Google’s best AI-powered smartphone yet."
    }
];

// -----------------------------
// LOAD ALL PRODUCTS (products.html)
// -----------------------------
function loadProducts() {
    const container = document.getElementById("product-list");
    if (!container) return;

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <p class="desc">${product.description}</p>

            <button class="btn-secondary"
                onclick="window.location.href='productdetails.html?id=${product.id}'">
                View Details
            </button>
        `;

        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", loadProducts);

// -----------------------------
// LOAD FEATURED PRODUCTS (home.html)
// -----------------------------
function loadFeatured() {
    const container = document.getElementById("featured-products");
    if (!container) return;

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

document.addEventListener("DOMContentLoaded", loadFeatured);

// -----------------------------
// LOAD PRODUCT DETAILS (productdetails.html)
// -----------------------------
function loadProductDetails() {
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

document.addEventListener("DOMContentLoaded", loadProductDetails);
