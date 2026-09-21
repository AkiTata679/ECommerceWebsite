// PRODUCT LIST (PHONES)

const products = [
    {
        id: 1,
        name: "iPhone 17 Pro Max",
        price: 1299,
        category: "Electronics",
        image: "../assets/images/iphone17promax.jpg",
        description: "The latest flagship iPhone with an A19 chip, advanced quad‑camera system, and stunning 120Hz display."
    },
    {
        id: 2,
        name: "Samsung Galaxy S25 Ultra",
        price: 1199,
        category: "Electronics",
        image: "../assets/images/galaxys25ultra.jpg",
        description: "Samsung’s most powerful device featuring a 200MP camera, S‑Pen support, and exceptional battery life."
    },
    {
        id: 3,
        name: "Google Pixel 10 Pro",
        price: 999,
        category: "Electronics",
        image: "../assets/images/pixel10pro.jpg",
        description: "Google’s AI‑powered smartphone with incredible computational photography and clean Android experience."
    },
    {
        id: 4,
        name: "OnePlus 13",
        price: 899,
        category: "Electronics",
        image: "../assets/images/oneplus13.jpg",
        description: "A flagship killer offering blazing performance, fast charging, and a smooth 144Hz AMOLED display."
    },
    {
        id: 5,
        name: "Xiaomi Mi 14 Pro",
        price: 799,
        category: "Electronics",
        image: "../assets/images/mi14pro.jpg",
        description: "High‑end specs at a competitive price with a powerful Snapdragon chipset and premium build quality."
    }
];


// RENDER PRODUCTS INTO GRID

function loadProducts() {
    const container = document.getElementById("product-list");

    if (!container) {
        console.error("Product container not found!");
        return;
    }

    container.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <p class="desc">${product.description}</p>
            <a href="productdetails.html?id=${product.id}" class="btn-secondary">View Details</a>
        `;

        container.appendChild(card);
    });
}

// Load products when page loads
document.addEventListener("DOMContentLoaded", loadProducts);




// LOAD FEATURED PRODUCTS ON HOME PAGE

function loadFeaturedProducts() {
    const container = document.getElementById("featured-products");

    if (!container) return; // Only run on home page

    container.innerHTML = "";

    // Choose first 3 products as featured
    const featured = products.slice(0, 3);

    featured.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <a href="productdetails.html?id=${product.id}" class="btn-secondary">View Details</a>
        `;

        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();          // For products.html
    loadFeaturedProducts();  // For home.html
});





// LOAD PRODUCT DETAILS PAGE

function loadProductDetails() {
    const detailsContainer = document.getElementById("product-details");

    if (!detailsContainer) return; // Only run on productdetails.html

    // Get ID from URL
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get("id"));

    // Find product
    const product = products.find(p => p.id === productId);

    if (!product) {
        detailsContainer.innerHTML = "<p>Product not found.</p>";
        return;
    }

    // Build details layout
    detailsContainer.innerHTML = `
        <div class="details-wrapper">
            <img src="${product.image}" class="details-image" alt="${product.name}">

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

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();          // products.html
    loadFeaturedProducts();  // home.html
    loadProductDetails();    // productdetails.html
});
