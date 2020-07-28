'use strict';

/* Global Variable Block */
const dispOne = $('#displayLineOne');
const dispTwo = $('#displayLineTwo');
const butts = $('#buttonContainer');

/* Global Display Variables */
var displayMemory = "";
var displayActive = "";

/* Global Equation Variables */
var eqVarOne = 0;
var eqOp = "";
var eqVarTwo = 0;
var equalsFlag = false;

/* Runtime Start */
addButtonListeners();
/* Runtime End */

/**
 * Adds number to display
 * @param {*} aNum Integer to use for equation
 */
function appendNumber(aNum) {
    displayActive += "" + aNum;
    refreshDisplay();
}


function appendOperator(aOp) {
    eqVarOne = parseFloat(displayActive);
    eqOp = aOp;
    displayMemory = eqVarOne + " " + aOp + " ";
    displayActive = "";
    refreshDisplay();
}

/**
 * Changes global variables to defaults and calls for refresh of display
 */
function clearCalculator() {
    displayMemory = "";
    displayActive = "";
    eqVarOne = 0;
    eqOp = 0;
    eqVarTwo = 0;
    refreshDisplay();
}

/**
 * Rewrites the display text lines to current global variables state
 */
function refreshDisplay() {
    dispOne.innerText = displayMemory;
    dispTwo.innerText = displayActive;
}

/**
 * Uses provided parameter to execute button event
 * @param {*} b target button
 */
function buttonEvent(aTarget) {
    switch(aTarget.value) {
        case "clear":
            clearCalculator();
        return;

        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            appendNumber(parseFloat(aTarget.value));
        return;

        case "+":
        case "-":
        case "x":
        case "/":
            appendOperator(aTarget.value);
        return;

    }
}

/**
 * Adds event listeners to all buttons used on the calculator
 */
function addButtonListeners() {
    const butts = document.querySelectorAll('button');
    butts.forEach((button) => {
        button.addEventListener('click',
            function(e) {
                buttonEvent(e.target);
            });
    });
}

/**
 * Function that queries an inquiry and returns the element.
 * @param {*} n Element name  to be queried and returned
 */
function $(n) { return document.querySelector(n); }