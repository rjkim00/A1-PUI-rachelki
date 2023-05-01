// Get the cart items container and the cart item template for a single item
const cartItemsContainer = document.querySelector('.cart-items');
const cartItemTemplate = document.querySelector('#cart-item-template');
  
// Get the checkout section and the total price element
const checkoutSection = document.querySelector('.checkout-section');
const totalPriceElement = document.querySelector('#total-price-text');
  
// retrieve cart data from local storage
let cartData = JSON.parse(localStorage.getItem('cart'));

//check if cart is empty or not
if (cartData != null) {
    console.log("Current Items in Cart: ", cartData);

} else {
    cartData = [];
    console.log("There are no items in your cart");

    //setting totalprice to 0$
    totalPriceElement.textContent = '$0.00'; 
};

//setting object for cart items display
let cartOrder = {
    items: [],
    totalPrice: 0
};


// Loop through the items to add and add each one to the cart
for (const item of cartData) {

    //convert packSize + current price string back into integer 
    item.packSize = parseInt(item.packSize);
    item.currentPrice = parseFloat(item.currentPrice);

    addItemToCart(item);
    calculateTotalPrice();
};


// Function to calculate the total price of the cart
function calculateTotalPrice() {
    let total = 0;

    for (const item of cartOrder.items) {
      total += item.currentPrice;
    };

    cartOrder.totalPrice = total;

    //update total with new total 
    if (cartOrder.items.length === 0) {
        totalPriceElement.textContent = '$0.00';
    } else {
        totalPriceElement.textContent = '$' + cartOrder.totalPrice.toFixed(2);
    };
};

//adding items to cartOrder object in order to display items in cart item template
function addItemToCart(item) {

    // Create a new cart item element from the template
    const cartItemElement = document.importNode(cartItemTemplate.content, true).firstElementChild;

    // Populate the cart item element with the item data
    cartItemElement.querySelector('#roll-type-text').textContent = item.type + " Cinnamon Roll";
    cartItemElement.querySelector('#glazing-type-text').textContent = "Glazing: " + item.glazing;
    cartItemElement.querySelector('#pack-type-text').textContent = "Pack Size: " + item.packSize;
    cartItemElement.querySelector('.price-text').textContent = '$' + item.currentPrice.toFixed(2);
    cartItemElement.querySelector('.item-image').src = rolls[item.type].image;
  
    // Add the cart item to the cart items container
    cartItemsContainer.appendChild(cartItemElement);
  
    // Add the item to the cart data object
    cartOrder.items.push(item);

    calculateTotalPrice();
};


// Function to remove an item from the cart
function removeItemFromCart(cartItemElement) {
    // Find the index of the item to remove
    const rollType = cartItemElement.querySelector('#roll-type-text').textContent.replace(" Cinnamon Roll", "");
    const glazingType = cartItemElement.querySelector('#glazing-type-text').textContent.replace("Glazing: ", "");
    const packSize = parseInt(cartItemElement.querySelector('#pack-type-text').textContent.replace("Pack Size: ", ""));
    const currentPrice = parseFloat(cartItemElement.querySelector('.price-text').textContent.slice(1));
    const index = cartOrder.items.findIndex(item => 
      item.type === rollType &&
      item.glazing === glazingType &&
      item.packSize === packSize &&
      item.currentPrice === currentPrice 
    );
  
    if (index !== -1) {
        // Remove the item from the cart data
        const removedItem = cartOrder.items.splice(index, 1)[0];
  
        //Subtract the removed item's price from total price
        cartOrder.totalPrice -= removedItem.currentPrice;

        //Calculate the new total price and update the element
        calculateTotalPrice();
    };

    // Remove the corresponding cart item element
    cartItemElement.remove();

    //saving to local storage   
    saveUpdateCart(); 
};

// Add a click event listener to the cart items container - this is for item removal
cartItemsContainer.addEventListener('click', event => {
    if (event.target.classList.contains('remove-button')) {
      const cartItemElement = event.target.closest('.item-format-box');
        removeItemFromCart(cartItemElement);
    };
});

//saving cart to local storage when user removes/adds items from cart 
function saveUpdateCart() {
    const cartData = cartOrder.items;
    const cartDataString = JSON.stringify(cartData);

    localStorage.setItem('cart', cartDataString);
    //console.log(localStorage);
};