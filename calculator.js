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

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", handleNumberButtonClick);
});

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
    }
}

// functions for basic math operators
function add(operand1, operand2) {
    return operand1 + operand2;
}

function subtract(operand1, operand2) {
    return operand1 - operand2;
}

function multiply(operand1, operand2) {
    return operand1 * operand2;
}

function divide(operand1, operand2) {
    if (operand2 === 0) {
        return "You cannot divide by zero";
    }

    return operand1 / operand2;
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