const add = function(a, b) {
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const multiply = function(a, b) {
    return a * b;
}

const divide = function(a, b) {
    if (b === 0) return "Error";
    return a / b;
}

let firstNumber = "";
let operator = "";
let secondNumber = "";
let resetScreen = false;

const operate = function(operator, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);

    let result;

    if (operator === "+") result = add(num1, num2);
    if (operator === "-") result =  subtract(num1, num2);
    if (operator === "x") result =  multiply(num1, num2);
    if (operator === "/") result =  divide(num1, num2);

    if (result === "Error") return result;

    return Math.round(result * 1000) / 1000;
}

const display = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".digit");

digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        const numberClicked = button.innerText;
        if (display.innerText === "0" || resetScreen) {
            display.innerText = numberClicked;
            resetScreen = false;
        }
        else {
            display.innerText += numberClicked;
        }
    })
})

const allClear = document.querySelector(".all-clear");

allClear.addEventListener("click", () => {
    display.innerText = 0;
    firstNumber = "";
    operator = "";
    secondNumber = "";
})

const backOne = document.querySelector(".back-one");

backOne.addEventListener("click", () => {
    let currentDisplay = display.innerText;
    let newDisplay = currentDisplay.slice(0, -1);
    if (newDisplay === "") {
        display.innerText = "0";
    }
    else {
        display.innerText = newDisplay;
    }
})

const operatorButtons = document.querySelectorAll(".operator");

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        resetScreen = false;

        const lastChar = display.innerText.slice(-1);
        const isOperator = ["+", "-", "x", "*", "/"].includes(lastChar);

        if (isOperator) {
            display.innerText = display.innerText.slice(0, -1);
        }

        if (operator !== "") {
            const currentDisplay = display.innerText;
            const numbers = currentDisplay.split(operator);

            if (numbers[1]) {
                const firstNum = numbers[0];
                const secondNum = numbers[1];
                const result = operate(operator, firstNum, secondNum);
                display.innerText = result;
            }
        }

        firstNumber = display.innerText;
        operator = button.innerText;
        display.innerText += button.innerText;
    })
})

const equalsButton = document.querySelector(".equals-btn");

equalsButton.addEventListener("click", () => {
    if (operator === "") return;

    const currentDisplay = display.innerText;
    const numbers = currentDisplay.split(operator);

    const firstNum = numbers[0];
    const secondNum = numbers[1];

    if (secondNum === undefined || secondNum === "") {
        return;
    }

    const result = operate(operator, firstNum, secondNum);
    display.innerText = result;
    resetScreen = true;
    operator = "";
})

const decimalButton = document.querySelector(".decimal");

decimalButton.addEventListener("click", () => {
    if (resetScreen) {
        display.innerText = "0.";
        resetScreen = false;
        return;
    }

    let currentNumber;

    if (operator === "") {
        currentNumber = display.innerText;
    }
    else {
        const parts = display.innerText.split(operator);
        currentNumber = parts[1];
    }

    if (currentNumber.includes(".")) {
        return;
    }

    display.innerText += ".";
})