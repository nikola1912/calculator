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
    writeOperatorToGlobal("percentage", newNumber);
}

function handleRoot() {
    let currentDisplay = document.getElementById("current");
    let currentNumber = Number(currentDisplay.textContent);
    let newNumber = Math.pow(currentNumber, 1/2);
    currentDisplay.textContent = newNumber;
    writeOperatorToGlobal("root", currentNumber);
}

function handleSquare() {
    let currentDisplay = document.getElementById("current");
    let currentNumber = Number(currentDisplay.textContent);
    let newNumber = Math.pow(currentNumber, 2);
    currentDisplay.textContent = newNumber;
    writeOperatorToGlobal("square", currentNumber);
}

function handleFraction() {
    let currentDisplay = document.getElementById("current");
    let currentNumber = Number(currentDisplay.textContent);
    let newNumber = 1/currentNumber;
    currentDisplay.textContent = newNumber;
    writeOperatorToGlobal("fraction", currentNumber);
}

function writeOperatorToGlobal(operator, number, isOperatorOn=globalStates.advancedOperatorState) {
    let previousDisplay = document.getElementById("previous");
    if (!isOperatorOn) {
        globalStates.advancedOperatorState = true;
        switch(operator) {
            case "percentage":
                previousDisplay.textContent += `${number} `;
                break;
            
            case "root":
                previousDisplay.textContent += `√(${number}) `;
                break;
            
            case "square":
                previousDisplay.textContent += `sqr(${number}) `;
                break;
    
            case "fraction":
                previousDisplay.textContent += `1/(${number}) `;
                break;
        }
    } else {
        let lastAdvancedOperator = findLastAdvancedOperator();
        let globalText = previousDisplay.textContent
        previousDisplay.textContent = globalText.slice(0, globalText.length - lastAdvancedOperator.length - 1); 
        writeOperatorToGlobal(operator, lastAdvancedOperator, false);
    }
}

function findLastAdvancedOperator() {
    let previousDisplay = document.getElementById("previous").textContent;
    previousDisplay = previousDisplay.split(" ");
    return previousDisplay[previousDisplay.length-2];
}

function handleDigit(digit) {
    let display = document.getElementById("current");
    if (display.textContent == 0 || globalStates.operatorState || globalStates.accumulatorState) { 
        display.textContent = ""; 
        globalStates.operatorState = false;
        globalStates.accumulatorState = false;
        globalStates.advancedOperatorState = false;
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

        case "square":
            handleSquare();
            break;

        case "fraction":
            handleFraction();
            break;

        case "dot":
            handleDecimalPoint();
            break;
    }
}
    
const globalStates = {
    operatorState: false, //Represents if the operator has been clicked
    advancedOperatorState: false,
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
    globalStates.advancedOperatorState = false;
}

function writeToGlobal(operator) {
    let previousDisplay = document.getElementById("previous");
    let currentNumber = Number(document.getElementById("current").textContent);
    if (!globalStates.advancedOperatorState) {       
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
    } else {
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
    globalStates.advancedOperatorState = false;
}
    
function handleClearAll() {
    let currentDisplay = document.getElementById("current");
    let previousDisplay = document.getElementById("previous");
    currentDisplay.textContent = "0";
    previousDisplay.textContent = "";
    globalStates.number = 0;
    globalStates.operator = "+";
    globalStates.operatorState = false;
    globalStates.advancedOperatorState = false;
    currentDisplay.style.fontSize = globalStates.displayFontSize;
}

function handleSignChange() {
    let currentDisplay = document.getElementById("current");
    let currentNumber = Number(currentDisplay.textContent);
    currentNumber *= (-1);
    currentDisplay.textContent = currentNumber;
    globalStates.operatorState = false;
    globalStates.advancedOperatorState = false;
}

function handleDecimalPoint() {
    let currentDisplay = document.getElementById("current");
    let currentDisplayContent = currentDisplay.textContent;
    let currentNumber = Number(currentDisplay.textContent);
    if (currentDisplayContent[currentDisplayContent.length-1] !== ".") {
        currentDisplay.textContent += "."
    }
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