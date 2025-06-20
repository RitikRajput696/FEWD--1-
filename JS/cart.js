document.addEventListener('DOMContentLoaded', () => {
    // --- Utility Functions ---

    /**
     * Retrieves cart items from localStorage.
     * @returns {Array} An array of cart item objects.
     */
    const getCartItems = () => {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    };

    /**
     * Saves cart items to localStorage.
     * @param {Array} items - The array of cart item objects to save.
     */
    const saveCartItems = (items) => {
        localStorage.setItem('cart', JSON.stringify(items));
    };

    /**
     * Calculates the total price of all items in the cart.
     * @param {Array} cartItems - The array of cart item objects.
     * @returns {number} The total subtotal of all items.
     */
    const calculateItemsSubtotal = (cartItems) => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // --- Cart Page Specific Logic ---

    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const cartSummaryContainer = document.getElementById('cart-summary-container');
    const cartTotalItemsSubtotal = document.getElementById('cart-total-items-subtotal');
    const cartShippingCost = parseFloat(document.getElementById('cart-shipping-cost').textContent);
    const cartFinalTotal = document.getElementById('cart-final-total');
    const checkoutBtn = document.querySelector('.checkout-btn');

    /**
     * Renders the cart items on the cart.html page.
     */
    const renderCart = () => {
        let cartItems = getCartItems();
        cartItemsContainer.innerHTML = ''; // Clear existing items

        if (cartItems.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartSummaryContainer.style.display = 'none';
        } else {
            emptyCartMessage.style.display = 'none';
            cartSummaryContainer.style.display = 'block';

            cartItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                const itemSubtotal = (item.price * item.quantity).toFixed(2);

                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Price: $<span class="item-price">${item.price.toFixed(2)}</span></p>
                        <div class="item-quantity-control">
                            <label for="qty-${item.id}">Quantity:</label>
                            <input type="number" id="qty-${item.id}" value="${item.quantity}" min="1" class="item-quantity" data-product-id="${item.id}">
                            <button class="remove-item-btn" data-product-id="${item.id}">Remove</button>
                        </div>
                        <p class="item-subtotal">Subtotal: $<span class="subtotal-amount">${itemSubtotal}</span></p>
                    </div>
                `;
                cartItemsContainer.prepend(itemElement); // Prepend to show new items at top or append
            });
        }
        updateCartSummary();
    };

    /**
     * Updates the summary section (items subtotal, total).
     */
    const updateCartSummary = () => {
        const currentCartItems = getCartItems();
        const itemsSubtotal = calculateItemsSubtotal(currentCartItems);
        const finalTotal = itemsSubtotal + cartShippingCost;

        cartTotalItemsSubtotal.textContent = itemsSubtotal.toFixed(2);
        cartFinalTotal.textContent = finalTotal.toFixed(2);
    };

    /**
     * Handles quantity changes for a specific item.
     * @param {string} productId - The ID of the product.
     * @param {number} newQuantity - The new quantity for the product.
     */
    const updateItemQuantity = (productId, newQuantity) => {
        let cartItems = getCartItems();
        const itemIndex = cartItems.findIndex(item => item.id === productId);

        if (itemIndex > -1) {
            cartItems[itemIndex].quantity = newQuantity;
            saveCartItems(cartItems);
            renderCart(); // Re-render to update subtotals on screen
        }
    };

    /**
     * Removes an item from the cart.
     * @param {string} productId - The ID of the product to remove.
     */
    const removeItemFromCart = (productId) => {
        let cartItems = getCartItems();
        cartItems = cartItems.filter(item => item.id !== productId);
        saveCartItems(cartItems);
        renderCart(); // Re-render the cart
    };

    // --- Event Listeners for Cart Page ---

    cartItemsContainer.addEventListener('change', (event) => {
        if (event.target.classList.contains('item-quantity')) {
            const productId = event.target.dataset.productId;
            let newQuantity = parseInt(event.target.value);
            if (isNaN(newQuantity) || newQuantity < 1) {
                newQuantity = 1; // Default to 1 if invalid
                event.target.value = 1; // Update input field
            }
            updateItemQuantity(productId, newQuantity);
        }
    });

    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item-btn')) {
            const productId = event.target.dataset.productId;
            removeItemFromCart(productId);
        }
    });

    checkoutBtn.addEventListener('click', () => {
        alert('Proceeding to checkout! (This is a placeholder action. In a real app, you\'d navigate to a secure checkout page or initiate a payment flow.)');
        // In a real application, you'd send the cart data to a backend for secure processing.
    });

    // --- Global "Add to Cart" Logic (for all pages with .add-to-cart-btn) ---
    // This part should technically be in a common JS file (e.g., main.js)
    // but for simplicity, we'll keep it here for now.

    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    const addItemToCart = (productData) => {
        let cartItems = getCartItems();
        const existingItemIndex = cartItems.findIndex(item => item.id === productData.id);

        if (existingItemIndex > -1) {
            // Item already in cart, increment quantity
            cartItems[existingItemIndex].quantity += 1;
        } else {
            // New item, add to cart with quantity 1
            cartItems.push({ ...productData, quantity: 1 });
        }
        saveCartItems(cartItems);
        alert(`${productData.name} added to cart!`); // Simple feedback
        // You might want to update a cart icon counter here too
    };

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productData = JSON.parse(event.target.dataset.product);
            addItemToCart(productData);
        });
    });

    // Initial render when cart.html loads
    renderCart();
});