const numbers = [...Array(10).keys()];
const operators = ["+", "-", "*", "/", "^", "%"];

let currentResult = "";
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
    if (b == 0) {
        clearAll();
        return alert("ERROR: Division by 0");
    }
    return a / b;
}
function operate(op, a, b) { return Math.round(op(a, b) * 100) / 100;}

const allButtons = document.querySelectorAll("button");
allButtons.forEach(button => button.addEventListener("click", clickButton));

function clickButton() {
    previousInput = latestInput;
    latestInput = this.textContent;
    if (latestInput == "AC") clearAll()
    if (operators.includes(latestInput)) {
        if (operator != "") {
            currentResult = operate(operator, operand1, +currentDisplay.textContent);
            operand1 = currentResult;
        }
        else {
            operand1 = +currentDisplay.textContent;
        }
        isDecimal = false;
        setOperator();
    }
    if (latestInput == "=") {
        if (operator == "" || operand1 == "" || currentDisplay.textContent == "") return;
        if (previousInput != "=") currentResult = operate(operator, operand1, +currentDisplay.textContent);
        operator = "";
        isDecimal = false;
        operand1 = currentResult;
    }
    updateDisplay();
    return console.log(this.textContent);
}

function updateDisplay() {
    if (latestInput == "AC") {
        return currentDisplay.textContent = "";
    }
    if (latestInput == "Back") {
        let currentDisplayText = currentDisplay.textContent;
        return currentDisplay.textContent = [...currentDisplayText].slice(0, currentDisplayText.length - 1).join("");
    }
    if (latestInput == "." && !isDecimal) {
        currentDisplay.textContent += ".";
        return isDecimal = true;
    }
    if (latestInput == "=") {
        return currentDisplay.textContent = currentResult;
    }
    if (operators.includes(latestInput)) {
        return currentDisplay.textContent = currentResult;
    }
    if (numbers.includes(parseInt(latestInput)) && currentDisplay.textContent == "0") {
        return currentDisplay.textContent = "";
    }
    if (numbers.includes(parseInt(latestInput)) && ((numbers.includes(parseInt(previousInput)) || previousInput == ".") || currentDisplay.textContent == "")) {
        return currentDisplay.textContent += latestInput;
    }
    else {
        return currentDisplay.textContent = latestInput;
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

function clearAll() {
    currentResult = "";
    previousInput = "";
    operand1 = "";
    operator = "";
    isDecimal = false;
}