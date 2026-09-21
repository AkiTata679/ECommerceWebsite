// -----------------------------
// CART SYSTEM USING LOCALSTORAGE
// -----------------------------

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(productId) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);

    if (!product) return;

    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart(cart);
    alert("Item added to cart!");
}

// Remove item
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    loadCart(); // refresh UI
}

// Increase quantity
function increaseQty(productId) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) item.quantity++;
    saveCart(cart);
    loadCart();
}

// Decrease quantity
function decreaseQty(productId) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);

    if (item && item.quantity > 1) {
        item.quantity--;
    } else {
        removeFromCart(productId);
        return;
    }

    saveCart(cart);
    loadCart();
}

// Load cart page
function loadCart() {
    const container = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");

    if (!container) return;

    const cart = getCart();
    container.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <img src="${item.image}" class="cart-img">

            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>

                <div class="qty-controls">
                    <button onclick="decreaseQty(${item.id})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQty(${item.id})">+</button>
                </div>

                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </div>
        `;

        container.appendChild(div);
    });

    totalContainer.innerHTML = `$${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", loadCart);
