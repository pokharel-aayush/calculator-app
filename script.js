let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);
let resultShown = false; // Flag to check if result has been shown

// Function to evaluate the expression
function calculate() {
    try {
        // Replace special characters for evaluation
        let expression = string.replace(/%/g, '/100')
                               .replace(/×/g, '*')
                               .replace(/÷/g, '/');
        
        // Prevent division by zero
        if (expression.includes('/0') && !expression.includes('/0.')) {
            input.value = "Error";
            string = "";
        } else {
            string = eval(expression).toString(); // Convert result to string
            input.value = string;
            resultShown = true; // Set flag as true after calculation
        }
    } catch (error) {
        input.value = "Error";
        string = "";
    }
}

// Add event listener to each button
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.innerHTML;

        // Remove focus from the button
        e.target.blur();

        if (buttonText === '=') {
            calculate();
        } else if (buttonText === 'AC') {
            string = "";
            input.value = string;
            resultShown = false;
        } else if (buttonText === 'DEL') {
            string = string.slice(0, -1);
            input.value = string;
            resultShown = false;
        } else {
            // If result is shown and user presses an operator, keep the result
            if (resultShown && /[+\-*/%×÷]/.test(buttonText)) {
                string += buttonText;
                input.value = string;
                resultShown = false;
            } 
            // If result is shown and user presses a number, start fresh
            else if (resultShown && /[0-9.]/.test(buttonText)) {
                string = buttonText;
                input.value = string;
                resultShown = false;
            } 
            // Normal input
            else {
                // Prevent consecutive operators
                if (/[+\-*/%×÷]$/.test(string) && /[+\-*/%×÷]/.test(buttonText)) {
                    return;
                }
                
                string += buttonText;
                input.value = string;
            }
        }
    });
});

// Listen for Enter key in the input box
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        string = input.value;
        calculate();
    }
});