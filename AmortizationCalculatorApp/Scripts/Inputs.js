// Validates characters for user keyboard inputs
document.getElementById('inputTerm').addEventListener('keypress', function (evt) { 
    let char = evt.which;
    
    if (char >= 48 && char <= 57 || char == 46) {
        return true;
    }
    else {
        evt.preventDefault();
        return false;
    }
});
document.getElementById('inputLoan').addEventListener('keypress', function (evt) {
    let char = evt.which;

    if (char >= 48 && char <= 57 || char == 46) {
        return true;
    }
    else {
        evt.preventDefault();
        return false;
    }
});
document.getElementById('inputInterest').addEventListener('keypress', function (evt) {
    let char = evt.which;

    if (char >= 48 && char <= 57 || char == 46) {
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
    document.getElementById("totalPrincipleSpan").innerHTML = "$0.00";
    document.getElementById("totalCostSpan").innerHTML = "$0.00";
    document.getElementById("totalInterestSpan").innerHTML = "$0.00";
    document.getElementById("monthlyPaymentSpan").innerHTML = "$0.00";
    document.getElementById("loanOutput").innerHTML = "$0.00";
    document.getElementById("termOutput").innerHTML = "0";
    document.getElementById("interestOutput").innerHTML = "0%";
    let table = $('#dataTable').DataTable();
    table.state.clear();
    window.location.reload();
}