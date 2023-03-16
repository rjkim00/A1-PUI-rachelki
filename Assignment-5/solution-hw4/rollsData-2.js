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

//Glaze Array
let glazingOptions = [
    {name: "Keep Original", price: 0.00},
    {name: "Sugar Milk", price: 0.00},
    {name: "Vanilla Milk", price: 0.50},
    {name: "Double Chocolate", price: 1.50}
];

//Pack Array
let packOptions = [
    {size: "1", price: 1},
    {size: "3", price: 3},
    {size: "6", price: 5},
    {size: "12", price: 10}
];