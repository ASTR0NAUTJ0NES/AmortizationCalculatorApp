// Validates characters for user keyboard inputs
document.getElementById('inputTerm').addEventListener('keypress', function (evt) { 
    let char = evt.which;
    
    if (char >= 48 && char <= 57 || char == 46 || char == 44 ) {
        return true;
    }
    else {
        evt.preventDefault();
        return false;
    }
});
document.getElementById('inputLoan').addEventListener('keypress', function (evt) {
    let char = evt.which;

    if (char >= 48 && char <= 57 || char == 46 || char == 44) {
        return true;
    }
    else {
        evt.preventDefault();
        return false;
    }
});
document.getElementById('inputInterest').addEventListener('keypress', function (evt) {
    let char = evt.which;

    if (char >= 48 && char <= 57 || char == 46 || char == 44) {
        return true;
    }
    else {
        evt.preventDefault();
        return false;
    }
});

// Function to clear user inputs
function reset() {
    document.getElementById('inputLoan').value = "";
    document.getElementById('inputTerm').value = "";
    document.getElementById('inputInterest').value = "";
}