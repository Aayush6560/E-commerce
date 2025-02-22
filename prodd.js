const cartButtons = document.querySelectorAll('.add-to-cart');
const cart = [];

cartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');
        
        cart.push({ name: productName, price: productPrice });
        alert(`${productName} added to cart!`);
    });
});
