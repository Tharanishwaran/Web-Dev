// script.js

// ==============================================
// 1. GET DOM ELEMENTS
// ==============================================

// Display elements
const currentDisplay = document.getElementById('current');
const previousDisplay = document.getElementById('previous');

// All buttons
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-action]');
const clearButton = document.querySelector('[data-action="clear"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const equalsButton = document.querySelector('[data-action="equals"]');
const decimalButton = document.querySelector('[data-action="decimal"]');

// ==============================================
// 2. CALCULATOR STATE
// ==============================================

let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let resetScreen = false;

// ==============================================
// 3. DISPLAY FUNCTIONS
// ==============================================

/**
 * Update the calculator display
 */
function updateDisplay() {
    currentDisplay.textContent = currentOperand;
    
    if (operation != null) {
        previousDisplay.textContent = `${previousOperand} ${getOperationSymbol(operation)}`;
    } else {
        previousDisplay.textContent = '';
    }
}

/**
 * Get symbol for display
 */
function getOperationSymbol(op) {
    const symbols = {
        'add': '+',
        'subtract': '-',
        'multiply': '×',
        'divide': '/'
    };
    return symbols[op] || op;
}

// ==============================================
// 4. NUMBER INPUT FUNCTIONS
// ==============================================

/**
 * Append number to current operand
 * @param {string} number - The number to append
 */
function appendNumber(number) {
    // If screen should be reset (after equals), start fresh
    if (resetScreen) {
        currentOperand = '';
        resetScreen = false;
    }
    
    // Prevent multiple zeros at start
    if (number === '0' && currentOperand === '0') return;
    
    // Replace initial zero
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        // Limit to 15 digits
        if (currentOperand.replace('.', '').length >= 15) {
            alert('Maximum digits reached!');
            return;
        }
        currentOperand += number;
    }
    
    updateDisplay();
}

/**
 * Add decimal point
 */
function addDecimal() {
    // If screen should be reset, start with "0."
    if (resetScreen) {
        currentOperand = '0.';
        resetScreen = false;
        updateDisplay();
        return;
    }
    
    // If no decimal point yet, add one
    if (!currentOperand.includes('.')) {
        currentOperand += '.';
        updateDisplay();
    }
}

// ==============================================
// 5. OPERATION FUNCTIONS
// ==============================================

/**
 * Choose an operation
 * @param {string} op - The operation to perform
 */
function chooseOperation(op) {
    // Don't do anything if no number entered
    if (currentOperand === '') return;
    
    // If we already have numbers and an operation, calculate first
    if (previousOperand !== '' && !resetScreen) {
        calculate();
    }
    
    // Store the operation and move current to previous
    operation = op;
    previousOperand = currentOperand;
    resetScreen = true;
    
    updateDisplay();
}

// ==============================================
// 6. CALCULATION FUNCTION
// ==============================================

/**
 * Perform the calculation
 */
function calculate() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    // Check if we have valid numbers
    if (isNaN(prev) || isNaN(current)) return;
    
    // Perform calculation based on operation
    switch (operation) {
        case 'add':
            result = prev + current;
            break;
        case 'subtract':
            result = prev - current;
            break;
        case 'multiply':
            result = prev * current;
            break;
        case 'divide':
            // Check for division by zero
            if (current === 0) {
                alert("Cannot divide by zero!");
                clearCalculator();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    // Format the result
    currentOperand = formatResult(result);
    operation = undefined;
    previousOperand = '';
    resetScreen = true;
    
    updateDisplay();
}

/**
 * Format the result for display
 * @param {number} number - The result to format
 * @returns {string} Formatted number string
 */
function formatResult(number) {
    // If number is too large, use scientific notation
    if (number > 1e15 || number < -1e15) {
        return number.toExponential(6);
    }
    
    // For decimal numbers, limit to 8 decimal places
    if (number % 1 !== 0) {
        // Round to 8 decimal places
        const rounded = Math.round(number * 1e8) / 1e8;
        return rounded.toString();
    }
    
    return number.toString();
}

// ==============================================
// 7. UTILITY FUNCTIONS
// ==============================================

/**
 * Clear the calculator
 */
function clearCalculator() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    resetScreen = false;
    updateDisplay();
}

/**
 * Delete last digit
 */
function deleteLastDigit() {
    // Don't delete if we only have one digit or it's zero
    if (currentOperand.length === 1 || currentOperand === '0') {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

// ==============================================
// 8. KEYBOARD SUPPORT
// ==============================================

/**
 * Handle keyboard input
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleKeyboardInput(e) {
    // Prevent default behavior for calculator keys
    if (
        e.key >= '0' && e.key <= '9' ||
        e.key === '.' ||
        e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' ||
        e.key === 'Enter' || e.key === 'Escape' || e.key === 'Backspace'
    ) {
        e.preventDefault();
    }
    
    // Number keys (0-9)
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
        return;
    }
    
    // Decimal point
    if (e.key === '.') {
        addDecimal();
        return;
    }
    
    // Operations
    if (e.key === '+') {
        chooseOperation('add');
        return;
    }
    
    if (e.key === '-') {
        chooseOperation('subtract');
        return;
    }
    
    if (e.key === '*') {
        chooseOperation('multiply');
        return;
    }
    
    if (e.key === '/') {
        chooseOperation('divide');
        return;
    }
    
    // Equals/Enter
    if (e.key === '=' || e.key === 'Enter') {
        calculate();
        return;
    }
    
    // Clear/Escape
    if (e.key === 'Escape') {
        clearCalculator();
        return;
    }
    
    // Delete/Backspace
    if (e.key === 'Backspace') {
        deleteLastDigit();
        return;
    }
}

// ==============================================
// 9. BUTTON CLICK HANDLERS
// ==============================================

/**
 * Add click event listeners to number buttons
 */
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.dataset.number);
        // Add visual feedback
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 100);
    });
});

/**
 * Add click event listeners to operator buttons
 */
operatorButtons.forEach(button => {
    if (button.dataset.action !== 'equals' && 
        button.dataset.action !== 'clear' && 
        button.dataset.action !== 'delete' &&
        button.dataset.action !== 'decimal') {
        
        button.addEventListener('click', () => {
            chooseOperation(button.dataset.action);
            button.classList.add('active');
            setTimeout(() => button.classList.remove('active'), 100);
        });
    }
});

// Equals button
equalsButton.addEventListener('click', () => {
    calculate();
    equalsButton.classList.add('active');
    setTimeout(() => equalsButton.classList.remove('active'), 100);
});

// Clear button
clearButton.addEventListener('click', () => {
    clearCalculator();
    clearButton.classList.add('active');
    setTimeout(() => clearButton.classList.remove('active'), 100);
});

// Delete button
deleteButton.addEventListener('click', () => {
    deleteLastDigit();
    deleteButton.classList.add('active');
    setTimeout(() => deleteButton.classList.remove('active'), 100);
});

// Decimal button
decimalButton.addEventListener('click', () => {
    addDecimal();
    decimalButton.classList.add('active');
    setTimeout(() => decimalButton.classList.remove('active'), 100);
});

// ==============================================
// 10. INITIALIZE CALCULATOR
// ==============================================

/**
 * Initialize the calculator
 */
function initCalculator() {
    // Add keyboard support
    document.addEventListener('keydown', handleKeyboardInput);
    
    // Add active state CSS
    const style = document.createElement('style');
    style.textContent = `
        .btn.active {
            transform: scale(0.95) !important;
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Initial display update
    updateDisplay();
    
    console.log('Calculator initialized!');
}

// Start the calculator when page loads
window.addEventListener('DOMContentLoaded', initCalculator);

// ==============================================
// 11. EXPLANATION OF KEY CONCEPTS
// ==============================================

/*
HOW THIS CALCULATOR WORKS:

1. STATE MANAGEMENT:
   - currentOperand: What's currently being typed (string)
   - previousOperand: The first number in calculation (string)
   - operation: Which math operation to perform (add/subtract/multiply/divide)
   - resetScreen: Flag to clear screen after equals

2. FLOW OF OPERATION:
   User clicks "5" → currentOperand = "5"
   User clicks "+" → previousOperand = "5", operation = "add", clear current
   User clicks "3" → currentOperand = "3"
   User clicks "=" → Calculate 5 + 3 = 8, display 8

3. IMPORTANT FUNCTIONS:
   - appendNumber(): Adds digits to current number
   - chooseOperation(): Stores operation and moves current to previous
   - calculate(): Does the math and shows result
   - updateDisplay(): Updates the screen

4. KEY FEATURES:
   - Prevents invalid input (multiple decimals, division by zero)
   - Limits to 15 digits
   - Formats large numbers
   - Keyboard support
   - Visual feedback on button clicks

TRY THESE CALCULATIONS:
   1. 5 + 3 = 8
   2. 10 ÷ 2 = 5
   3. 7 × 8 = 56
   4. 9 - 4 = 5

    index:       0    1    2    3
 operators:  "+"  "*"  "-"  "/"
 numbers:   [10] [2] [3] [4] [2]

*/