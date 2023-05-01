//DEFINING VARIABLES
//base price
let basePrice = 2.49;
document.getElementById("base-price").innerHTML= "$" + basePrice.toFixed(2);

//current properties
let currentGlazing;
let currentPackSize;

//user's cart array --- storing rolls in cart 
let cart = [];
try {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
} catch (e) {
    console.error('Error parsing cart:', e);
}

//reset cart when the page is refreshed, checks if page is being reloaded
if (performance.navigation.type === 1) {
    localStorage.removeItem('cart');
}

//Roll class in order to create new roll objects
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.packSize = packSize;
        this.basePrice = basePrice;
        this.currentPrice = (((basePrice + glazingOptions[rollGlazing]) * packOptions[packSize])).toFixed(2);    
    }
}

//UPDATING DETAILS ON DETAIL-PAGE: url parameters, title, price
//Call the query string from the URL -- list of parameters that begins with a question mark.
//Begins with a question mark (known as 'search parameters')
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);


//Now accessing roll class parameters by using 'get' method
let rollType = urlParams.get("roll");
let selectedRoll = rolls[rollType];


//Need to update basePrice depending on user's selection and need to update display of price
basePrice = rolls[rollType].basePrice;
document.getElementById("base-price").innerHTML = '$' + basePrice.toFixed(2);


//update page title and roll image based on the selected roll
document.getElementById("details-page-title").innerHTML = rolls[rollType].name;
document.querySelector('.product-detail-image').src = rolls[rollType].image;


//SETTING GLAZE AND PACK: options + price
//Glaze Dropdown menu
let glazingSelect = document.getElementById("glazingTypes");
for (let glazeOption in glazingOptions) {
    let option = document.createElement('option');
    option.text = glazeOption;
    option.value = glazingOptions[glazeOption];
    glazingSelect.add(option);
}
//Pack Dropdown menu
let packSelect = document.getElementById("packTypes");
for (let packOption in packOptions) {
    let option = document.createElement('option');
    option.text = packOption;
    option.value = packOptions[packOption];
    packSelect.add(option);
}


//UPDATING GLAZE AND PACK: options + price
glazingSelect.addEventListener('change', function() {
    currentGlazing = glazingSelect.options[glazingSelect.selectedIndex].text;
    updatePrice();
});

packSelect.addEventListener('change', function() {
    currentPackSize = packSelect.options[packSelect.selectedIndex].text;
    updatePrice();
});

//DEFINING UPDATEPRICE FUNCTION: what is going to be displayed based on the options
function updatePrice() {
    let glazingPrice = parseFloat(glazingSelect.value);
    let packPrice = parseFloat(packSelect.value);
    let total = (basePrice + glazingPrice) * packPrice;
    document.getElementById("base-price").innerHTML = "$" + total.toFixed(2);
}


//DEFINING ADDTOCART FUNCTION: console update when adding roll(s) to cart
function addToCart() {
    let glazing = glazingSelect.options[glazingSelect.selectedIndex].text;
    let packSize = packSelect.options[packSelect.selectedIndex].text;

    glazingPrice = parseFloat(glazingSelect.value);
    packPrice = parseFloat(packSelect.value);

    let roll = new Roll(rollType, glazing, packSize, basePrice);
    cart.push(roll);

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Current rolls of cart in local storage:", localStorage.getItem('cart'));

}

//ADDING another EventListener to AddToCart Button
document.getElementById("cart-add").addEventListener('click', addToCart);

function showCart() {
    console.log("Current rolls of cart in local storage:", localStorage.getItem('cart'));
}

window.addEventListener('load', showCart);