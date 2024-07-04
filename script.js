let cart = [];

function addToCart(name, image) {
    const product = cart.find(item => item.name === name);
    if (product) {
        product.quantity++;
    } else {
        cart.push({ name, image, quantity: 1 });
    }
    alert(name + ' добавлен в корзину!');
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function updateQuantity(name, change) {
    const product = cart.find(item => item.name === name);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            removeFromCart(name);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
    displayCart();
}

window.onload = function() {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        cart = savedCart;
    }
    displayCart();
};

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    if (cartItems) {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <span>${item.name}</span>
                <span>Quantity: ${item.quantity}</span>
                <button onclick="updateQuantity('${item.name}', 1)">+</button>
                <button onclick="updateQuantity('${item.name}', -1)">-</button>
                <button onclick="removeFromCart('${item.name}')">Remove</button>
            `;
            cartItems.appendChild(li);
        });
    }
}

function sendCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const email = 'dbezrukova482@gmail.com';
    const subject = 'Order from Furniture Store';
    const body = 'The following items were ordered:\n\n' + cart.map(item => `${item.name} (Quantity: ${item.quantity})`).join('\n');
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
