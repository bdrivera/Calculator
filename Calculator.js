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
        appendClear();
    }
    displayActive += "" + aNum; //add number to display
    refreshDisplay();
}

/**
 * Adds operator to display and moves active number to memory
 * @param {*} aOp String operator to use for equation
 */
function appendOperator(aOp) {
    clearFlag = false;

    if(aOp == "=" && //if the user pressed '=' and...
        (eqOp == "" || displayActive == "")) { //not yet selected an operator or a number...
        return;
    }

    if(eqOp != "" && displayActive == "") { //if an operator is already selected...
        appendDelete(); //remove current operator from memory line
        eqOp = ""; //remove current operator logically
    }

    if(displayMemory == "") {
        eqVar = undefined;
    }

    if(displayActive == "ERROR") {
        return;
    }
    
    if(eqVar == undefined) { //if we haven't performed an operation yet...
        eqVar = parseFloat(displayActive); //prepare for second number in equation...
    } else { //if we're ready to do a calculation...
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
                if(parseFloat(displayActive) == 0) { //if user divides by 0...
                    aOp = "e";
                    break;
                }
                eqVar /= parseFloat(displayActive);
            break;
        }
    }

    if(aOp == "e") { //if the user made an expected error...
        appendClear();
        displayActive = "ERROR";
        clearFlag = true;
        refreshDisplay();
    } else if(aOp != "=") { //if the user went right into another operation...
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

/**
 * Deletes last entered character
 */
function appendDelete() {
    if(clearFlag == true) { //clear the display if it needs to be...
        appendClear();
    }

    if(displayActive != "") { //if the active display is not empty...
        displayActive = displayActive.slice(0, -1); //remove last entered number
    } else if(eqOp != "" && displayActive == "") { //if no operator selected and display empty...
        eqOp = 0; //remove operator logically
        displayMemory = displayMemory.slice(0, -3); //remove operator from memory
    } else if(eqOp == "" && displayActive == "" && displayMemory != "") {
        displayActive = displayMemory.slice(0, -1);
        displayMemory = "";
    }

    refreshDisplay();
}

/**
 * Changes active entry to percentage by multiplication
 */
function appendPercent() {
    if(displayActive == "ERROR") {
        return;
    }
    
    if(displayActive != "") { //if the active display isn't emtpy...
        displayActive = (parseFloat(displayActive) / 100); //add number to display
        refreshDisplay();
    }
}

/**
 * Inserts a decimal point to active entry
 */
function appendDecimal() {
    if(displayActive == "ERROR") {
        return;
    }

    if(displayActive.includes(".")) { //if the active display already has a decimal...
        return;
    } else if(displayActive == "") { //if the active display is empty...
        displayActive = "0."; //lead with a 0.
    } else {
        displayActive += "."; //add period to active display
    }
    refreshDisplay();
}

/**
 * Changes active entry to opposite sign eg. positive to negative
 */
function appendFlip() {
    if(displayActive == "ERROR") {
        return;
    }

    if(displayActive != "") { //if the active display is empty...
        displayActive = (parseFloat(displayActive) * -1); //add number to display
        refreshDisplay();
    }
}

/**
 * Changes global variables to defaults and calls for refresh of display
 */
function appendClear() {
    displayMemory = "";
    displayActive = "";
    eqVar = undefined;
    eqOp = "";
    clearFlag = false;
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
            appendDelete();
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