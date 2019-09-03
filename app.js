function handleAddition(x, y) {   
    return x + y;
}


function handleSubtraction(x, y) {
    return x - y;
}


function handleMultiplication(x, y) {
    return x * y;
}


function handleDivision(x, y) {
    return x / y;
}


function handleDigit(digit) {
    let display = document.getElementById("current");
    if (display.textContent == 0) { 
        display.textContent = ""; 
    }
    display.textContent += digit;
}

function handleOperator(operator) {
    switch (operator) {
    
        case "add":
            writeToGlobal("+");
            operate();
            globalVars.operator = "+";
            break;

        case "subtract":
            writeToGlobal("-");
            operate();
            globalVars.operator = "-";
            break;

        case "multiply":
            writeToGlobal("×");
            operate();
            globalVars.operator = "×";
            break;

        case "divide":
            writeToGlobal("÷");
            operate();
            globalVars.operator = "÷";
            break;

        case "equal":
            operate();
            document.getElementById("previous").textContent = "";
            break;

        case "clear":
            clear();
            break;
        
        case "clearAll":
            clearAll();
            break;
    }
}


function clear() {
    let display = document.getElementById("current");
    (display.textContent.length === 1) ?
        display.textContent = "0" :
        display.textContent = display.textContent.slice(0, -1);
}

function clearAll() {
    let currentDisplay = document.getElementById("current");
    let previousDisplay = document.getElementById("previous");
    currentDisplay.textContent = "0";
    previousDisplay.textContent = "";
}

function handleButtonClick(e) {
    if (e.target !== e.currentTarget) {
        /digit/.test(e.target.className) ? //CHECKS IF THE CLICKED BUTTON IS A DIGIT OR AN OPERATOR
            handleDigit(Number(e.target.id)) :
            handleOperator(e.target.id);
    }
    e.stopPropagation();
}

let buttons = document.getElementById("buttons");
buttons.addEventListener("click", handleButtonClick);