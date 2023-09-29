const prompt = require("prompt-sync")();

//Global variables. Prefer encapsulation...
const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = {
    "A":2,
    "B":4,
    "C":6,
    "D":8
}

const SYMBOL_VALUES = { //Get a line of As * result by 5
    "A":5,
    "B":4,
    "C":3,
    "D":2
}

//1. Player deposits money
const depositAmount = () => {
    const amount = parseFloat(prompt("Enter Your Deposit: $"));
    if (isNaN(amount) || amount <= 0) {
        console.log("Please enter a valid amount.");
        return depositAmount(); // Recursive call to re-prompt the user
    }
    return amount;
};
//depositAmount();

// 2. Determine number of lines to bet on
const getNumberOfLines = () => {
    const numberOfLines = parseFloat(prompt("Enter # of lines to bet on (1-3): "));
    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {//Isolates 1,2,3
        console.log("Please enter a valid number of lines.");
        return getNumberOfLines();
    }
    return numberOfLines;
};
//getNumberOfLines();

const getBet = (balance, lines) => {
    const bet = parseFloat(prompt("Enter Your Bet Per Line: $"));
    if (isNaN(bet) || bet <= 0 || bet > (balance/lines)) {
        console.log("Please enter a valid bet.");
        return getBet(); // Recursive call to re-prompt the user
    }
    return bet;
}


// 3. Collect Bet Ammount
let balance = depositAmount();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);





//How to run: node project.js