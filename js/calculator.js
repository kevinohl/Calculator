const numbers = [...Array(10).keys()];
const operators = ["+", "-", "*", "/", "^", "%"];

let currentResult = 0;
let previousInput = "";
let latestInput = "";
let currentDisplay = document.querySelector("#calc-display");
let isDecimal = false;
let operator = "";
let operand1 = "";

function add(a, b) {return a + b;}
function subtract(a, b) {return a - b;}
function multiply(a, b) {return a * b;}
function power(a, b) {return a ** b;}
function modulo(a, b) {return a % b;}
function divide(a, b) {
    if (b == 0) return "ERROR: Division by 0";
    return a / b;
}
function operate(op, a, b) {return op(a, b);}

const allButtons = document.querySelectorAll("button");
allButtons.forEach(button => button.addEventListener("click", clickButton));

function clickButton() {
    previousInput = latestInput;
    latestInput = this.textContent;
    if (latestInput == "AC") {
        previousInput = "";
        operand1 = "0";
        operator = "";
        isDecimal = false;
    }
    if (operators.includes(latestInput)) {
        operand1 = +currentDisplay.textContent;
        isDecimal = false;
        setOperator();
    }
    if (latestInput == "=") {
        isDecimal = false;
        currentDisplay.textContent = operate(operator, operand1, +currentDisplay.textContent);
    }
    updateDisplay();
    return console.log(this.textContent);
}

function updateDisplay() {
    if (latestInput == "AC") {
        currentDisplay.textContent = "";
    }
    if (latestInput == "Back") {
        let currentDisplayText = currentDisplay.textContent;
        currentDisplay.textContent = [...currentDisplayText].slice(0, currentDisplayText.length - 1).join("");
    }
    if (latestInput == "." && !isDecimal) {
        currentDisplay.textContent += ".";
        isDecimal = true;
    }
    if (operators.includes(latestInput)) {
        currentDisplay.textContent = "";
    }
    if (numbers.includes(parseInt(latestInput)) && currentDisplay.textContent == "0") {
        currentDisplay.textContent = "";
    }
    if (numbers.includes(parseInt(latestInput)) && ((numbers.includes(parseInt(previousInput)) || previousInput == ".") || currentDisplay.textContent == "")) {
        currentDisplay.textContent += latestInput;
    }
}

function setOperator() {
    switch (latestInput) {
        case "+": {
            operator = add;
            break;
        }
        case "-": {
            operator = subtract;
            break;
        }
        case "*": {
            operator = multiply;
            break;
        }
        case "/": {
            operator = divide;
            break;
        }
        case "%": {
            operator = modulo;
            break;
        }
        case "^": {
            operator = power;
            break;
        }
    }
}