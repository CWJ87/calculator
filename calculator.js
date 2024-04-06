"use strict";

// parts of the calculator operation
let operand1, operator, operand2;
let isEditOperand2;
const MAX_DIGITS = 12;

// calculator's display
const resultDisplay = document.querySelector(".result-display");
const operationDisplay = document.querySelector(".operation-display");

// calculator's buttons
const clearButton = document.querySelector(".all-clear");
clearButton.addEventListener("click", initializeCalculator);

const signChangeButton = document.querySelector(".sign-change");
signChangeButton.addEventListener("click", handleSignChangeButtonClick);

const backspaceButton = document.querySelector(".backspace");
backspaceButton.addEventListener("click", handleBackspaceButtonClick);

const decimalButton = document.querySelector(".decimal");
decimalButton.addEventListener("click", handleDecimalButtonClick);

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", handleNumberButtonClick);
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", handleOperatorButtonClick);
});

const equalButton = document.querySelector(".equals");
equalButton.addEventListener("click", handleEqualsButtonClick);

// initialize and reset calculator's memory
function initializeCalculator() {
    operand1 = "0";
    operator = "";
    operand2 = "";
    isEditOperand2 = false;

    resultDisplay.textContent = operand1;    
    operationDisplay.textContent = "";
}

// handles whether the current number is positive or negative
function handleSignChangeButtonClick() {
    let resultDisplayNumber = resultDisplay.textContent;

    if (resultDisplay.textContent !== "0") {
        // check if the result display contains a sign (-)
        if (!resultDisplayNumber.includes("-")) {
            resultDisplayNumber = "-" + resultDisplayNumber;
        }
        else {
            resultDisplayNumber = resultDisplayNumber.slice(1);
        }
    
        // update the corresponding operand and the result display
        if (!isEditOperand2) {
            operand1 = resultDisplayNumber;
        }
        else {
            operand2 = resultDisplayNumber;
        }
    }

    resultDisplay.textContent = resultDisplayNumber;
}

// handles removing last digit from a number
function handleBackspaceButtonClick() {
    if (!isEditOperand2) {
        if (operand1.length === 1 || operand1.length === 2 && operand1[0] === "-") {
            operand1 = "0";
        }
        else {
            operand1 = operand1.slice(0, operand1.length - 1);
        }
        resultDisplay.textContent = operand1;
    }
    else {
        if (operand2.length === 1 || operand2.length === 2 && operand2[0] === "-") {
            operand2 = "0";
        }
        else {
            operand2 = operand2.slice(0, operand2.length - 1);
        }
        
        resultDisplay.textContent = operand2;
    }
}

// handles adding a decimal to the current number
function handleDecimalButtonClick() {
    if (!isEditOperand2) {
        if (!operand1.includes(".")) {
            operand1 += ".";
            resultDisplay.textContent = operand1;
        }
    }
    else {
        if (!operand2.includes(".")) {
            operand2 += ".";
            resultDisplay.textContent = operand2;
        }
    }
}

// handles number (0-9) input from user
function handleNumberButtonClick() {
    const buttonNumber = this.textContent;

   // Check if the current display's length is less than 12 (max digits)
    if (resultDisplay.textContent.length < MAX_DIGITS) {
        // input for the first operand
        if (!isEditOperand2) {
            if (buttonNumber !== "0" && operand1 === "0") {
                operand1 = buttonNumber;
                resultDisplay.textContent = operand1;                
            }
            else if (operand1 !== "0") {
                operand1 += buttonNumber;
                resultDisplay.textContent = operand1;                
            }
        }
        else { // input for second operand
            if (buttonNumber !== "0" && operand2 === "0") {
                operand2 = buttonNumber;
                resultDisplay.textContent = operand2;                
            }
            else if (operand2 !== "0") {
                operand2 += buttonNumber;
                resultDisplay.textContent = operand2;                
            }
        }
    }
}

// handles selecting operator and math operation
function handleOperatorButtonClick() {
    const operatorSigns = {
        add: "+",
        subtract: "-",
        multiply: "x",
        divide: "/"
    };

    // get formatted operator sign based on the button's operator name
    operator = operatorSigns[this.classList[1]];    

    // update the operation display with the operands and operator
    if (!isEditOperand2) {
        operationDisplay.textContent = `${operand1} ${operator}`;
        isEditOperand2 = true;
    }
    else if (operand2 === "") {        
        operationDisplay.textContent = `${operand1} ${operator}`;
    }
    else if (operand2 !== "") { // stringing multiple operations
        const prevOperation = operationDisplay.textContent.split(" ")[1];

        operate(operand1, prevOperation, operand2);
        operand1 = resultDisplay.textContent;
        operand2 = "";
        operationDisplay.textContent = `${operand1} ${operator}`;
    }
}

// handles a math operation using two operands
function handleEqualsButtonClick() {
    operate(operand1, operator, operand2);
    operationDisplay.textContent = `${operand1} ${operator} ${operand2} =`;    
}

// functions for basic math operators
function add(operand1, operand2) {
    resultDisplay.textContent = +operand1 + +operand2;
}

function subtract(operand1, operand2) {
    resultDisplay.textContent = +operand1 - +operand2;
}

function multiply(operand1, operand2) {
    resultDisplay.textContent = +operand1 * +operand2;
}

function divide(operand1, operand2) {
    if (operand2 === "0") {
        resultDisplay.textContent = "Cannot divide by 0";
    }
    else {
        resultDisplay.textContent = +operand1 / +operand2;
    }
}

// will call one of the operation functions based on the selected operator
function operate(operand1, operator, operand2) {
    switch (operator) {
        case "+":
            add(operand1, operand2);
            break;
        case "-":
            subtract(operand1, operand2);
            break;
        case "x":
            multiply(operand1, operand2);
            break;
        case "/":
            divide(operand1, operand2);
    }
}

initializeCalculator();