// amortization JS

// formats output to US Currency format
const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2
})

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
	document.getElementById("totalPrincipleSpan").innerHTML = `${formatter.format(inputLoanAmount)}`;
});

// do calculations when user submits data
function calculate() {

	let loanAmount = parseFloat(document.getElementById("inputLoan").value);
	let term = parseInt(document.getElementById("inputTerm").value);
	let interestRate = parseFloat(document.getElementById("inputInterest").value);

	if (isNaN(loanAmount) || isNaN(term) || isNaN(interestRate)) {
		Swal.fire({
			title: 'Error!',
			text: 'Inputs can not be blank',
			icon: 'warning',
			confirmButtonText: 'Back'
		})
	} else {
		// outputting total cost
		let tCost = `${formatter.format(totalCost(monthlyInterestRate(interestRate), loanAmount, term))}`;
		document.getElementById("totalCostSpan").innerHTML = tCost;
		// outputting total interest
		let tInterest = `${formatter.format(totalInterest(totalCost(monthlyInterestRate(interestRate), loanAmount, term), loanAmount))}`;
		document.getElementById("totalInterestSpan").innerHTML = tInterest;

		// outputting monthly payment
		let mPayment = `${formatter.format(monthlyPayment(totalCost(monthlyInterestRate(interestRate), loanAmount, term), term))}`
		document.getElementById("monthlyPaymentSpan").innerHTML = mPayment;

		document.getElementById("loanOutput").innerHTML = `${loanAmount}`;
		document.getElementById("termOutput").innerHTML = `${term}`;
		document.getElementById("interestOutput").innerHTML = `${interestRate}%`;

		let tableOut = "";
		//Loop to fill the table
		for (let i = 1; i <= term; i++) {
			tableOut += '<tr>';
			tableOut += `<td>${i}</td>`
        }
	}


	
}