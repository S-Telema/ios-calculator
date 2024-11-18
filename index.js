const numbers = document.querySelectorAll('.numbers');
const result = document.querySelector('.result span');
const signs = document.querySelectorAll('.sign');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const negative = document.querySelector('.negative');
const percent = document.querySelector('.percent');
const decimal = document.querySelector('.decimal');

let firstValue = "";
let isFirstValue = false;
let secondValue = "";
let isSecondValue = false;
let sign = "";
let resultValue = 0;
let decimalUsedInFirstValue = false; 
let decimalUsedInSecondValue = false;

// Event listener for number buttons
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', (e) => {
        let atr = e.target.getAttribute('value');
        if (isFirstValue === false) {
            getFirstValue(atr);
        }
        if (isSecondValue === false && sign !== "") {
            getSecondValue(atr);
        }
    });
}

// Function to handle first value input
function getFirstValue(el) {
    result.innerHTML = "";
    if (el === "." && !decimalUsedInFirstValue) { // Prevent multiple decimals
        firstValue += el;
        decimalUsedInFirstValue = true; // Mark decimal as used
    } else if (el !== ".") {
        firstValue += el;
    }
    result.innerHTML = firstValue;
    firstValue = +firstValue;
}

// Function to handle second value input
function getSecondValue(el) {
    if (firstValue !== "" && sign !== "") {
        result.innerHTML = "";
        if (el === "." && !decimalUsedInSecondValue) { // Prevent multiple decimals
            secondValue += el;
            decimalUsedInSecondValue = true; // Mark decimal as used
        } else if (el !== ".") {
            secondValue += el;
        }
        result.innerHTML = secondValue;
        secondValue = +secondValue;
    }
}

// Function to handle sign input
function getSign() {
    for (let i = 0; i < signs.length; i++) {
        signs[i].addEventListener('click', (e) => {
            sign = e.target.getAttribute('value');
            isFirstValue = true;
        });
    }
}

getSign();

// Event listener for equals button
equals.addEventListener('click', () => {
    result.innerHTML = "";
    if (sign === "+") {
        resultValue = firstValue + secondValue;
    } else if (sign === "-") {
        resultValue = firstValue - secondValue;
    } else if (sign === "÷") {
        resultValue = firstValue / secondValue;
    } else if (sign === "×") {
        resultValue = firstValue * secondValue;
    }

    resultValue = roundToSuitableDecimal(resultValue); // Round the result to a suitable decimal
    result.innerHTML = resultValue;
    firstValue = resultValue;
    secondValue = "";
    decimalUsedInFirstValue = false; // Reset decimal usage for the next input
    decimalUsedInSecondValue = false; // Reset decimal usage for the next input
});

// Function to round the result to a suitable decimal place
function roundToSuitableDecimal(value) {
    // Round to a maximum of 8 decimal places to avoid long decimals (adjustable)
    let roundedValue = value.toFixed(5);
    
    // Convert to number to remove trailing zeros after rounding
    return Number(roundedValue);
}

// Event listener for negative button
negative.addEventListener('click', () => {
    result.innerHTML = "";
    if (firstValue !== "") {
        resultValue = -firstValue;
        firstValue = resultValue;
    }

    if (firstValue !== "" && secondValue !== "" && sign !== "") {
        resultValue = -resultValue;
    }
    resultValue = roundToSuitableDecimal(resultValue); // Round after negation
    result.innerHTML = resultValue;
});

// Event listener for percent button
percent.addEventListener('click', () => {
    result.innerHTML = "";
    if (firstValue !== "") {
        resultValue = firstValue / 100;
        firstValue = resultValue;
    }

    if (firstValue !== "" && secondValue !== "" && sign !== "") {
        resultValue = -resultValue / 100;
    }
    resultValue = roundToSuitableDecimal(resultValue); // Round after percent operation
    result.innerHTML = resultValue;
});

// Event listener for clear button
clear.addEventListener('click', () => {
    result.innerHTML = 0;
    firstValue = "";
    isFirstValue = false;
    secondValue = "";
    isSecondValue = false;
    sign = "";
    resultValue = 0;
    decimalUsedInFirstValue = false; // Reset for the next operation
    decimalUsedInSecondValue = false; // Reset for the next operation
});

// Event listener for decimal button
decimal.addEventListener('click', () => {
    if (sign === "") { // First value input
        if (!decimalUsedInFirstValue) {
            firstValue += ".";
            result.innerHTML = firstValue;
            decimalUsedInFirstValue = true;
        }
    } else { // Second value input
        if (!decimalUsedInSecondValue) {
            secondValue += ".";
            result.innerHTML = secondValue;
            decimalUsedInSecondValue = true;
        }
    }
});
