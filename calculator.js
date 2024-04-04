"use strict";

// parts of the calculator operation
let operand1, operator, operand2;

// calculator's display
const resultDisplay = document.querySelector(".result-display");
const operationDisplay = document.querySelector(".operation-display");

// calculator's buttons
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(numberButton => handleNumberButtonClick);

// initialize and reset calculator's memory
function initializeCalculator() {
    operand1 = "0";
    operator = "";
    operand2 = "";

    resultDisplay.textContent = operand1;
    operationDisplay.textContent = "";
}

// handles number (0-9) input from user
function handleNumberButtonClick() {


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