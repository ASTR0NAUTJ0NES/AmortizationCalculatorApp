// amortization JS

function formatMoney(number, decPlaces, decSep, thouSep) {
	decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
		decSep = typeof decSep === "undefined" ? "." : decSep;
	thouSep = typeof thouSep === "undefined" ? "," : thouSep;
	var sign = number < 0 ? "-" : "";
	var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
	var j = (j = i.length) > 3 ? j % 3 : 0;

	return sign +
		(j ? i.substr(0, j) + thouSep : "") +
		i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
		(decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}

// calculate monthy interest rate
function monthlyInterestRate(yearlyInterestRate) {
	return (yearlyInterestRate / 100) / 12;
}

// calculates total cost
function totalCost(monthlyInterestRate, principleLoanAmount, totalMonths) {
	return ((monthlyInterestRate * principleLoanAmount) / (1 - (1 + monthlyInterestRate) ** -totalMonths)) * totalMonths;
}

// calculate monthly payment
function monthlyPayment(totalCost, totalMonths) {
	return totalCost / totalMonths;
}

// calculate total interest accrued
function totalInterest(totalCost, principleLoanAmount) {
	return totalCost - principleLoanAmount;
}

// adds formatted principle loan amount to results as you enter
document.getElementById("inputLoan").addEventListener("focusout", function () {
	let inputLoanAmount = Number(document.getElementById("inputLoan").value);
	document.getElementById("totalPrincipleSpan").innerHTML = `$${formatMoney(inputLoanAmount, 2, ".", ",")}`;
});

// do calculations when user submits data
function calculate() {

	let loanAmount = parseFloat(document.getElementById("inputLoan").value);
	let term = parseInt(document.getElementById("inputTerm").value);
	let interestRate = parseFloat(document.getElementById("inputInterest").value);

	if (isNaN(loanAmount) || isNaN(term) || isNaN(interestRate)) {
		alert("Your inputs cannot be blank!");
	} else {
		// outputting total cost
		document.getElementById("totalCostSpan").innerHTML = `$${formatMoney(totalCost(monthlyInterestRate(interestRate), loanAmount, term), 2, ".", ",")}`;

		// outputting total interest
		document.getElementById("totalInterestSpan").innerHTML = `$${formatMoney(totalInterest(totalCost(monthlyInterestRate(interestRate), loanAmount, term), loanAmount), 2, ".", ",")}`;

		// outputting monthly payment
		document.getElementById("monthlyPaymentSpan").innerHTML = `$${formatMoney(monthlyPayment(totalCost(monthlyInterestRate(interestRate), loanAmount, term), term), 2, ".", ",")}`;

		document.getElementById("loanOutput").innerHTML = `$${loanAmount}`;
		document.getElementById("termOutput").innerHTML = `${term}`;
		document.getElementById("interestOutput").innerHTML = `${interestRate}%`;
    }

	
}