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

function handlePercentage() {
    let currentDisplay = document.getElementById("current");
    let currentNumber = Number(currentDisplay.textContent);
    let newNumber = currentNumber/100;
    currentDisplay.textContent = newNumber;
}

function handleRoot() {
    let currentDisplay = document.getElementById("current");
    let currentNumber = Number(currentDisplay.textContent);
    let newNumber = Math.pow(currentNumber, 1/2);
    currentDisplay.textContent = newNumber;
}

function handleDigit(digit) {
    let display = document.getElementById("current");
    if (display.textContent == 0 || globalStates.operatorState || globalStates.accumulatorState) { 
        display.textContent = ""; 
        globalStates.operatorState = false;
        globalStates.accumulatorState = false;
    }
    display.textContent += digit;
}

function handleOperator(operatorType) {
    switch (operatorType) {
        case "add":
            handleOperation("+");
            break;
            
        case "subtract":
            handleOperation("-");
            break;

        case "multiply":
            handleOperation("×");
            break;

        case "divide":
            handleOperation("÷");
            break;

        case "equal":
            handleEqual();
            break;
            
        case "clear":
            handleClearDigit();
            break;
        
        case "clearAll":
            handleClearAll();
            break;

        case "sign":
            handleSignChange();
            break;

        case "percentage":
            handlePercentage();
            break;

        case "root":
            handleRoot();
            break;
    }
}
    
const globalStates = {
    operatorState: false, //Represents if the operator has been clicked
    operator: "+",
    number: 0,
    accumulatorNumber: 0, //The number you accumulate to the global number while pressin "="
    accumulatorState: false, //Represents if the accumulator is ON (if "=" is being used)
    displayFontSize: getComputedStyle(document.getElementById("current")).fontSize
}

function handleEqual() {
    let currentDisplay = document.getElementById("current");
    let currentNumber = Number(currentDisplay.textContent);
    let globalNumber = globalStates.number;
    let operationResult;
    if (!globalStates.accumulatorState) {
        document.getElementById("previous").textContent = "";
        globalStates.accumulatorNumber = currentNumber;
        globalStates.accumulatorState = true;
        globalStates.operatorState = true;
        operationResult = handleMaths(globalStates.operator, globalNumber, globalStates.accumulatorNumber);
    } else {
        operationResult = handleMaths(globalStates.operator, currentNumber, globalStates.accumulatorNumber);
    }
    currentDisplay.textContent = operationResult;
    globalStates.number = operationResult;
}

function handleOperation(operator) {
    writeToGlobal(operator);
    if (!globalStates.operatorState) {
        let currentDisplay = document.getElementById("current");
        let currentNumber = Number(currentDisplay.textContent);
        let globalNumber = globalStates.number;
        let operationResult = handleMaths(globalStates.operator, globalNumber, currentNumber);
        currentDisplay.textContent = operationResult;
        globalStates.number = operationResult;
        globalStates.operatorState = true;
    } 
    globalStates.operator = operator;
}

function writeToGlobal(operator) {
    let previousDisplay = document.getElementById("previous");
    let currentNumber = Number(document.getElementById("current").textContent);
    if (!globalStates.operatorState || globalStates.accumulatorState) {
        if (currentNumber.toString()[0] === "-") {
            previousDisplay.textContent += `(${currentNumber}) ${operator} `; 
        } else {
            previousDisplay.textContent += `${currentNumber} ${operator} `; 
        }
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

function handleClearDigit() {
    let display = document.getElementById("current");
    (display.textContent.length === 1) ?
        display.textContent = "0" :
        display.textContent = display.textContent.slice(0, -1);
    globalStates.operatorState = false;
}
    
function handleClearAll() {
    let currentDisplay = document.getElementById("current");
    let previousDisplay = document.getElementById("previous");
    currentDisplay.textContent = "0";
    previousDisplay.textContent = "";
    globalStates.number = 0;
    globalStates.operator = "+";
    globalStates.operatorState = false;
    currentDisplay.style.fontSize = globalStates.displayFontSize;
}

function handleSignChange() {
    let currentDisplay = document.getElementById("current");
    let currentNumber = Number(currentDisplay.textContent);
    currentNumber *= (-1);
    currentDisplay.textContent = currentNumber;
}

function handleDisplayOverflow() {
    let currentDisplay = document.getElementById("current");
    if (isDisplayOverflow(currentDisplay)) {
        let displayFont = getComputedStyle(currentDisplay).fontSize;
        displayFont = Number(parseFloat(displayFont).toFixed(2));
        displayFont -= 5;
        currentDisplay.style.fontSize = `${displayFont}px`;
    }       
}

function isDisplayOverflow(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function convertPixelToEm(pixelVal) {
    let bodyPixelSize = getComputedStyle(document.body).fontSize;
    bodyPixelSize = Number(parseFloat(bodyPixelSize).toFixed(2));
    let pixeValInNums = Number(parseFloat(pixelVal).toFixed(2))
    let emValue = pixeValInNums / bodyPixelSize;
    return Number(emValue.toFixed(2));
}

function handleButtonClick(e) {
    if (e.target !== e.currentTarget) { 
        /digit/.test(e.target.className) ? //Checks if the clicked button is a digit or an operator
            handleDigit(Number(e.target.id)) :
            handleOperator(e.target.id);
        handleDisplayOverflow()  
    }
    e.stopPropagation();
}

let buttons = document.getElementById("buttons");
buttons.addEventListener("click", handleButtonClick);