// cart.js

// Initialize the cart array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
function addToCart(name, price) {
    const existingProductIndex = cart.findIndex(item => item.name === name);

    if (existingProductIndex > -1) {
        // If product already exists, increase the quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // Add new product to cart
        cart.push({ name, price: parseFloat(price), quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Store cart in local storage
    alert(`${name} has been added to your cart!`); // Optional alert for feedback
}

// Function to display cart items
function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.querySelector('.cart-table-body');
    const totalAmountElem = document.querySelector('.total-amount');

    // Clear previous items
    cartList.innerHTML = '';

    // Calculate total price
    let totalPrice = 0;

    cartItems.forEach(item => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        row.innerHTML = `
            <td>${item.name}</td>
            <td>₹${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>₹${itemTotal.toFixed(2)}</td>
            <td><button class="btn remove-btn" data-name="${item.name}">Remove</button></td>
        `;
        cartList.appendChild(row);
    });

    totalAmountElem.textContent = `₹${totalPrice.toFixed(2)}`;

    // Add event listeners for remove buttons
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productName = this.getAttribute('data-name');
            removeFromCart(productName);
        });
    });
}

// Function to remove item from cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart)); // Update cart in local storage
    displayCart(); // Refresh cart display
}

// Display cart items on page load
if (document.querySelector('.cart-container')) {
    displayCart();
}

// Add event listeners to buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-name');
        const productPrice = this.getAttribute('data-price');
        addToCart(productName, productPrice);
    });
});