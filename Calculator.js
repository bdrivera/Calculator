'use strict';

/* Global Variable Block */
const dispOne = $('#displayLineOne'); //accessor for calculator memory line
const dispTwo = $('#displayLineTwo'); //accessor for calculator active line
const butts = $('#buttonContainer'); //accesssor for calculator buttons container

/* Global Display Variables */
var displayMemory = ""; //top line for last number entered and active operator
var displayActive = ""; //bottom line for number being currently entered

/* Global Equation Variables */
var eqVar = undefined; //storage for results
var eqOp = ""; //storage for active operator
var clearFlag = false; //will display need to be cleared on next button press?

/* Runtime Start */
addButtonListeners();
/* Runtime End */

/**
 * Adds number to display
 * @param {*} aNum Float number to use for equation
 */
function appendNumber(aNum) {
    if(clearFlag == true) { //clear the display if it needs to be...
        displayActive = "";
        clearFlag = false; //reset the flag...
    }
    displayActive += "" + aNum; //add number to display
    refreshDisplay();
}

/**
 * Adds operator to display and moves active number to memory
 * @param {*} aOp String operator to use for equation
 */
function appendOperator(aOp) {
     
    if(aOp == "=" && //if the user pressed '=' and...
        (eqOp == "" || displayActive == "")) { //not yet selected an operator or a number...
        return;
    }

    
    if(eqVar == undefined) { //if nothing has been entered yet...
        eqVar = parseFloat(displayActive); 
    } else {
        switch(eqOp) { //find the correct mathmatical function...
            case "+":
                eqVar += parseFloat(displayActive);
            break;
            case "-":
                eqVar -= parseFloat(displayActive);
            break;
            case "x":
                eqVar *= parseFloat(displayActive);
            break;
            case "/":
                eqVar /= parseFloat(displayActive);
            break;
        }
    }

    if(aOp != "=") { //if the user went right into another operation...
        eqOp = aOp;
        displayMemory = eqVar + " " + aOp + " ";
        displayActive = "";
        refreshDisplay();
    } else { //if the user just pressed enter...
        eqOp = "";
        displayMemory += displayActive;
        displayActive = eqVar;
        clearFlag = true;
        refreshDisplay();
    }
}

function appendDelete() {

}

function appendPercent() {
    if(displayActive != "") {
        displayActive = (parseFloat(displayActive) / 100); //add number to display
        refreshDisplay();
    }
}

function appendDecimal() {

}

function appendFlip() {

}

/**
 * Changes global variables to defaults and calls for refresh of display
 */
function appendClear() {
    displayMemory = "";
    displayActive = "";
    eqVar = undefined;
    eqOp = "";
    refreshDisplay();
}

/**
 * Rewrites the display text lines to current global variable states
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
            appendClear();
        return;

        case "delete":
            appendFlip();
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
        case "=":
            appendOperator(aTarget.value);
        return;

        case "%":
            appendPercent();
        return;

        case "decimal":
            appendDecimal();
        return;

        case "flip":
            appendFlip();
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
 * Function that queries and returns the element.
 * @param {*} n Element name  to be queried and returned
 */
function $(n) { return document.querySelector(n); }