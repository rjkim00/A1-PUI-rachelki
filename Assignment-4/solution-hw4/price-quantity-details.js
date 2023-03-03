//DEFINING VARIABLES
//base price
let basePrice = 2.49;
document.getElementById("base-price").innerHTML = "$" + basePrice.toFixed(2);

//current properties
let currentGlazing;
let currentPackSize;

//user's cart array --- storing rolls in cart 
let cart = [];

//Roll class in order to create new roll objects (6 options)
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.packSize = packSize;
        this.basePrice = basePrice;
    }
}

//defining objects to put into roll class
let rolls = {
    Original: {
        name: "Original Cinnamon Roll",
        image: "./products/original-cinnamon-roll.jpg",
        basePrice: 2.49
    },
    Apple: {
        name: "Apple Cinnamon Roll",
        image: "./products/apple-cinnamon-roll.jpg",
        basePrice: 3.49
    },
    Raisin: {
        name: "Raisin Cinnamon Roll",
        image: "./products/raisin-cinnamon-roll.jpg",
        basePrice: 2.99
    },
    Walnut: {
        name: "Walnut Cinnamon Roll",
        image: "./products/walnut-cinnamon-roll.jpg",
        basePrice: 3.49
    },
    DoubleChocolate: {
        name: "Double-Chcolate Cinnamon Roll",
        image: "./products/double-chocolate-cinnamon-roll.jpg",
        basePrice: 3.99
    },
    Strawberry: {
        name: "Strawberry Cinnamon Roll",
        image: "./products/strawberry-cinnamon-roll.jpg",
        basePrice: 3.99
    }
};

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
document.getElementById("base-price").innerHTML = "$" + basePrice.toFixed(2);

//update page title and roll image based on the selected roll
document.getElementById("details-page-title").innerHTML = rolls[rollType].name;
document.querySelector('.product-detail-image').src = rolls[rollType].image;

//SETTING GLAZE AND PACK: options + price
//Glaze Array
let glazingOptions = [
    {name: "Keep Original", price: 0.00},
    {name: "Sugar Milk", price: 0.00},
    {name: "Vanilla Milk", price: 0.50},
    {name: "Double Chocolate", price: 1.50}
];

//Glaze Dropdown menu
let glazingSelect = document.getElementById("glazingTypes"); 
for (let i = 0; i < glazingOptions.length; i++) {
    let option = document.createElement('option');
    option.text = glazingOptions[i].name;
    option.value = glazingOptions[i].price;
    glazingSelect.add(option);
}

//Pack Array
let packOptions = [
    {size: "1", price: 1},
    {size: "3", price: 3},
    {size: "6", price: 5},
    {size: "12", price: 10}
];

//Pack Dropdown menu
let packSelect = document.getElementById("packTypes");
for (let i = 0; i < packOptions.length; i++) {
    let option = document.createElement('option');
    option.text = packOptions[i].size;
    option.value = packOptions[i].price;
    packSelect.add(option);
}

//UPDATING GLAZE AND PACK: options + price
glazingSelect.addEventListener('change', function() {
    currentGlazing = glazingSelect.options[glazingSelect.selectedIndex].text;
    updatePrice();
})

packSelect.addEventListener('change', function() {
    currentPackSize = packSelect.options[packSelect.selectedIndex].text;
    updatePrice();
})

//DEFINING UPDATEPRICE FUNCTION: what is going to be displayed based on the options
function updatePrice() {
    let glazingPrice = parseFloat(glazingSelect.value);
    let packPrice = parseFloat(packSelect.value);
    let total = (basePrice + glazingPrice) * packPrice;
    document.getElementById("base-price").innerHTML = '$' + total.toFixed(2);
}

//DEFINING ADDTOCART FUNCTION: console update when adding roll(s) to cart
function addToCart() {
    let glazing = glazingSelect.options[glazingSelect.selectedIndex].text;
    let packSize = packSelect.options[packSelect.selectedIndex].text;

    let glazingPrice = parseFloat(glazingSelect.value);
    let packPrice = parseFloat(packSelect.value);

    let roll = new Roll(rolls[rollType].name, glazing, packSize, (basePrice + glazingPrice)*packPrice);
    cart.push(roll);
    console.log(cart);
}
//ADDING another EventListener to AddToCart Button
document.getElementById("cart-add").addEventListener('click', addToCart);

