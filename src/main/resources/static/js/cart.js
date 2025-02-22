let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add product to cart
function addToCart(name, price) {
    const product = { name, price, quantity: 1 };
    const existingProductIndex = cart.findIndex(item => item.name === name);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity++;
    } else {
        cart.push(product);
    }
    updateCartDisplay();
    saveCartToLocalStorage();
}

// Function to update cart display
function updateCartDisplay() {
    const cartTableBody = document.querySelector('.cart-table-body');
    cartTableBody.innerHTML = ''; // Clear existing cart items

    let total = 0;

    cart.forEach(item => {
        const row = document.createElement('tr');
        const totalPrice = item.price * item.quantity;
        total += totalPrice;

        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" class="quantity-input" onchange="updateQuantity('${item.name}', this.value)">
            </td>
            <td>$${totalPrice.toFixed(2)}</td>
            <td><button class="btn remove-btn" onclick="removeFromCart('${item.name}')">Remove</button></td>
        `;

        cartTableBody.appendChild(row);
    });

    // Update total amount
    document.querySelector('.total-amount').textContent = `$${total.toFixed(2)}`;
}

// Function to update quantity
function updateQuantity(name, quantity) {
    const product = cart.find(item => item.name === name);
    if (product) {
        product.quantity = parseInt(quantity);
        updateCartDisplay();
        saveCartToLocalStorage();
    }
}

// Function to remove product from cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartDisplay();
    saveCartToLocalStorage();
}

// Function to save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Event listeners for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');
        addToCart(productName, parseFloat(productPrice));
    });
});

// Load the cart display on page load
document.addEventListener('DOMContentLoaded', updateCartDisplay);
