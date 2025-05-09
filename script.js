let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);
let resultShown = false; // Flag to check if result has been shown

// Function to evaluate the expression
function calculate() {
    try {
        // Replace '%' with '/100' for percentage calculations
        let expression = string.replace(/%/g, '/100');
        
        // Prevent division by zero
        if (expression.includes('/0')) {
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
            resultShown = false; // Reset the flag
        } else if (buttonText === 'DEL') {
            string = string.slice(0, -1);
            input.value = string;
        } else {
            // Clear input only if result is shown and new input is a number
            if (resultShown && /[0-9.]/.test(buttonText)) {
                string = "";     // Reset string
                resultShown = false; // Reset flag to allow new input
            }

            // Prevent consecutive operators
            if (/[+\-*/%]$/.test(string) && /[+\-*/%]/.test(buttonText)) {
                return;
            }

            string += buttonText;
            input.value = string;
        }
    });
});

// Listen for Enter key in the input box
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        string = input.value;  // Update string with the current input value
        calculate();           // Perform the calculation
    }
});
