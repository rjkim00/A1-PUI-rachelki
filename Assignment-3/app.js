//DEFINING VARIABLES
//base price

let glazingPriceAdapt;
let packPriceMult;
let initialCharge = 2.49;

//ARRAY FOR GLAZING OPTIONS
let glazingOptions = [
    {name: 'Keep Original', price: 0.00},
    {name: 'Sugar Milk', price: 0.00},
    {name: 'Vanilla Milk', price: 0.50},
    {name: 'Double Chocolate', price: 1.50},
];

//SETTING CURRENT GLAZEPRICE ADAPT TO PRICE OF 1ST OPT
glazingPriceAdapt = glazingOptions[0].price;

//ARRAY FOR PACK SIZE OPTIONS
let packOptions = [
    {size: '1', multiplier: 1},
    {size: '3', multiplier: 3},
    {size: '6', multiplier: 5},
    {size: '12', multiplier: 10},
];

//SETTING CURRENT PACKMULT TO MULT OF 1ST OPT
packPriceMult = packOptions[0].multiplier;

//UPDATING DISPLAYED PRICE FUNCTION
//tofixed is used to format the final price that would be displayed on the page as a string w/ 2 decimal places
//in this case, the string will always have two decimal places
function updateNewPrice() {
    let priceDisplay = (initialCharge + glazingPriceAdapt)*packPriceMult;
    document.getElementById("current-price").innerHTML = '$' + priceDisplay.toFixed(2);
}

//GLAZING OPTIONS DROPDOWN MENU
let glazingSelection = document.querySelector('#glazingTypes');
for (let i=0; i < glazingOptions.length; i++){
    let choice = document.createElement('option');
    choice.text = glazingOptions[i].name;
    choice.value = glazingOptions[i].price;
    glazingSelection.add(choice);
}

//EVENT LISTENER - GLAZE DROPDOWN - CURRENT GLAZEPRICE UPDATE FOR EVERY NEW SELECTION
//when user is selecting an option from dropdown menu, this event will occur --- function trigger -- updating the price
//parsefloat -- built-in JavaScript function -- converts string to a floating-point number to a number with decimal places -- price
glazingSelection.addEventListener('change',function() {
    glazingPriceAdapt = parseFloat(this.value);
    updateNewPrice();
});

//PACK SIZE DROPDOWN MENU
let packSizeSelection = document.querySelector('#packSizes');
for (let i=0; i<packOptions.length; i++) {
    let choice = document.createElement('option');
    choice.text = packOptions[i].multiplier;
    choice.value = packOptions[i].multiplier;
    packSizeSelection.add(choice);
}

//EVENT LISTENER - PACK DROPDOWN - CURRENT PACKPRICE UPDATE FOR EVERY NEW SELECTION
//when user is selecting an option from dropdown menu, this event will occur --- function trigger -- updating the price
packSizeSelection.addEventListener('change', function() {
packPriceMult = parseFloat(this.value);
updateNewPrice();
})

