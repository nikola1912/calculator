function handleAddition(x, y) {   
    globalVars.operator = "+";
    return x + y;
}


function handleSubtraction(x, y) {
    globalVars.operator = "-";
    return x - y;
}


function handleMultiplication(x, y) {
    globalVars.operator = "×";
    return x * y;
}


function handleDivision(x, y) {
    globalVars.operator = "÷";
    return x / y;
}


function enterDigit(x) {
    let display = document.getElementById("current");
    if (display.textContent == 0 || globalVars.operatorState) { 
        display.textContent = ""; 
        globalVars.operatorState = false;
    }
    display.textContent += x;
}


function clear() {
    let display = document.getElementById("current");
    (display.textContent.length === 1) ? display.textContent = "0" : display.textContent = display.textContent.slice(0, -1);
    globalVars.operatorState = false;
}


function clearAll() {
    let currentDisplay = document.getElementById("current");
    let previousDisplay = document.getElementById("previous");
    currentDisplay.textContent = "0";
    previousDisplay.textContent = "";
    globalVars.number = 0;
    globalVars.operator = "+";
    globalVars.operatorState = false;
}

let globalVars = {
    operatorState: false,
    operator: "+",
    number: 0,
    firstNumber: 0
}

function writeToGlobal(operator) {
    let previousDisplay = document.getElementById("previous");
    let currentDisplay = document.getElementById("current");
    let currentNumber = Number(currentDisplay.textContent);

    if (!globalVars.operatorState) {
        previousDisplay.textContent += `${currentNumber} ${operator} `; 

    } else {
        previousDisplay.textContent = previousDisplay.textContent.slice(0, -2);
        previousDisplay.textContent += `${operator} `;
    }
}

function handleMaths(operator, globalNumber, currentNumber) {
    switch (operator) {
        case "+":
            return handleAddition(globalNumber, currentNumber);

        case "-":
            return handleSubtraction(globalNumber, currentNumber);

        case "×":
            return handleMultiplication(globalNumber, currentNumber);

        case "÷":
            return handleDivision(globalNumber, currentNumber);
    }
}


function operate() {
    if (!globalVars.operatorState) {
        let currentDisplay = document.getElementById("current");
        let currentNumber = Number(currentDisplay.textContent);
        let globalNumber = globalVars.number;
        let switchResult = handleMaths(globalVars.operator, globalNumber, currentNumber);
        currentDisplay.textContent = switchResult;
        globalVars.number = switchResult;
        globalVars.operatorState = true;
    } 
}

//NOT FINISHED
function handleEqual() {
    let previousDisplay = document.getElementById("previous");
    let currentDisplay = document.getElementById("current");

    let currentNumber = Number(currentDisplay.textContent);
    let globalNumber = globalVars.number;
    globalNumber.firstNumber = currentNumber;

    let switchResult = handleMaths(globalVars.operator, globalNumber, globalNumber.firstNumber);

    previousDisplay.textContent = "";
    currentDisplay.textContent = switchResult;
}

function buttonClick(e) {
    if (e.target !== e.currentTarget) {
        
        if (/digit/.test(e.target.className)) {
            console.log(typeof e.target.id);
            enterDigit(Number(e.target.id));
        } else {
            switch (e.target.id) {
    
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
    }
    e.stopPropagation();
}


let buttons = document.getElementById("buttons");
buttons.addEventListener("click", buttonClick);