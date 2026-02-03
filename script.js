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

const operate = function(operator, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);

    if (operator === "+") return add(num1, num2);
    if (operator === "-") return subtract(num1, num2);
    if (operator === "x") return multiply(num1, num2);
    if (operator === "/") return divide(num1, num2);
}

const display = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".digit");

digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        const numberClicked = button.innerText;
        if (display.innerText === "0") {
            display.innerText = numberClicked;
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
})