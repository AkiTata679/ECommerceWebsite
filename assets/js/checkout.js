document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("checkout-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const address = document.getElementById("address").value.trim();

        const cart = getCart();
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const orderData = {
            name,
            email,
            address,
            cart,
            total
        };

        try {
            const res = await fetch("http://localhost:3000/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData)
            });

            const data = await res.json();

            if (data.success) {
                localStorage.removeItem("cart");
                window.location.href = "confirmation.html";
            } else {
                alert("Failed to submit order.");
            }
        } catch (error) {
            console.error("Order error:", error);
            alert("Something went wrong.");
        }
    });
});
