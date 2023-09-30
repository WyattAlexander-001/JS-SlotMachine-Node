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

// 4. Spin the machine
const spin = () =>{
    const symbols = [];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i =0;i<count;i++){
            symbols.push(symbol);
        }
    }
    const reels = [[],[],[]]; //Each [] is a col
    for (let i =0;i< COLS; i++){
        const reelSymbols = [...symbols];
        for(let j = 0;j<ROWS;j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
        }
    }
    return reels;
}
// const reels = spin();
// console.log(reels);

const transpose = (reels) => {
    const rows = [];

    for (let i =0; i< ROWS; i++){
        rows.push([]);
        for(let j=0; j <COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows;
}

const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for(const[i,symbol] of row.entries()){
            rowString += symbol
            if(i != row.length -1){
                rowString += " | "
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (rows,bet,lines) =>{
    let winnings = 0;

    for(let row = 0; row < lines;row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if(allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings;
}

const game = () => {
    // 3. Collect Bet Ammount
    let balance = depositAmount();

    while(true){
        console.log("You have a balance of $" + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows,bet,numberOfLines)
        balance += winnings;
        console.log("You won, $" + winnings.toString())

        if(balance <= 0){
            console.log("You are out of money!");
            break;
        }

        const playAgain = prompt("Play again? [y/n]");
        if(playAgain != "y"){
            break;
        }
    }
}

game();



//How to run: node project.js