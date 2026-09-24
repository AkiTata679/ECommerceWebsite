function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId, qty = 1) {
    let cart = getCart();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: qty
        });
    }

    saveCart(cart);
    showCartPopup();

    if (window.location.pathname.includes("cart.html")) {
        loadCart();
    }
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    loadCart();
}

function increaseQty(productId) {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) item.quantity++;
    saveCart(cart);
    loadCart();
}

function decreaseQty(productId) {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);

    if (!item) return;

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        removeFromCart(productId);
        return;
    }

    saveCart(cart);
    loadCart();
}

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

function showCartPopup() {
    const popup = document.getElementById("cart-popup");
    if (!popup) return;

    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 2000);
}
