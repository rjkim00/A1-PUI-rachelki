class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.packSize = packSize;
        this.basePrice = basePrice;

        this.rollImage = rolls[rollType].image;
        this.currentPrice = ((this.basePrice + glazingOptions[this.glazing]) * packOptions[this.packSize]);
    }
};
  
// Define the items to add to the cart
const itemsToAdd = [
    new Roll('Original', 'Sugar Milk', 1, 2.49),
    new Roll('Walnut', 'Vanilla Milk', 12, 3.49),
    new Roll('Raisin', 'Sugar Milk', 3, 2.99),
    new Roll('Apple', 'Keep Original', 3, 3.49)
];

  
// Get the cart items container and the template for a single item
const cartItemsContainer = document.querySelector('.cart-items');
const cartItemTemplate = document.querySelector('#cart-items-template');
  
// Get the checkout section and the total price element
const checkoutSection = document.querySelector('.checkout-section');
const totalPriceElement = document.querySelector('#total-price-text');
  
// Set up an object to store the cart data
const cartData = {
items: [],
totalPrice: 0
};
  
// Function to calculate the total price of the cart
function calculateTotalPrice() {
    let total = 0;
    for (const item of cartData.items) {
      total += item.currentPrice;
    }
    cartData.totalPrice = total;
    totalPriceElement.textContent = '$' + cartData.totalPrice.toFixed(2);
};
  
// Function to add a new item to the cart
function addItemToCart(item, index) {
    // Create a new cart item element from the template
    const cartItemElement = document.importNode(cartItemTemplate.content, true).firstElementChild;
  
    // Populate the cart item element with the item data
    cartItemElement.querySelector('#roll-type-text').textContent = item.type + " Cinnamon Roll";
    cartItemElement.querySelector('#glazing-type-text').textContent = "Glazing: " + item.glazing;
    cartItemElement.querySelector('#pack-type-text').textContent = "Pack Size: " +item.packSize;
    cartItemElement.querySelector('.price-text').textContent = '$' + item.currentPrice.toFixed(2);
    cartItemElement.querySelector('.item-image').src = item.rollImage;
  
    // Add the cart item to the cart items container
    cartItemsContainer.appendChild(cartItemElement);
  
    // Add the item to the cart data object
    if (index !== undefined) {
        cartData.items.splice(index, 0, item);
    } else {
        cartData.items.push(item);
    }
  
    // Update the total price
    calculateTotalPrice();
};

// Loop through the items to add and add each one to the cart
for (const item of itemsToAdd) {
    // console.log(item);
    addItemToCart(item, undefined);
};

// Function to remove an item from the cart
function removeItemFromCart(cartItemElement) {
    // Find the index of the item to remove
    const rollType = cartItemElement.querySelector('#roll-type-text').textContent.replace(" Cinnamon Roll", "");
    const glazingType = cartItemElement.querySelector('#glazing-type-text').textContent.replace("Glazing: ", "");
    const packSize = parseInt(cartItemElement.querySelector('#pack-type-text').textContent.replace("Pack Size: ", ""));
    const currentPrice = parseFloat(cartItemElement.querySelector('.price-text').textContent.slice(1));
    const index = cartData.items.findIndex(item => 
      item.type === rollType &&
      item.glazing === glazingType &&
      item.packSize === packSize
    );
  
    if (index !== -1) {
      // Remove the item from the cart data
      const removedItem = cartData.items.splice(index, 1)[0];
  
      // Update the total price
      cartData.totalPrice -= removedItem.currentPrice;
      totalPriceElement.textContent = '$' + cartData.totalPrice.toFixed(2);

      //Calculate the new total price and update the element
      calculateTotalPrice();
    }
  
    // Remove the corresponding cart item element
    cartItemElement.remove();
}

// Add a click event listener to the cart items container
cartItemsContainer.addEventListener('click', event => {
    if (event.target.classList.contains('remove-button')) {
      const cartItemElement = event.target.closest('.item-format-box');
      removeItemFromCart(cartItemElement);
    }
});