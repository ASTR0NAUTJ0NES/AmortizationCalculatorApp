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
		document.getElementById("totalCostSpan").innerHTML = `${tCost}`;
		// outputting total interest
		let tInterest = `${formatter.format(totalInterest(totalCost(monthlyInterestRate(interestRate), loanAmount, term), loanAmount))}`;
		document.getElementById("totalInterestSpan").innerHTML = `${tInterest}`;

		// outputting monthly payment
		let mPayment = `${monthlyPayment(totalCost(monthlyInterestRate(interestRate), loanAmount, term), term)}`
		document.getElementById("monthlyPaymentSpan").innerHTML = `${formatter.format(mPayment)}`;


		document.getElementById("loanOutput").innerHTML = `${formatter.format(loanAmount)}`;
		document.getElementById("termOutput").innerHTML = `${term} Months`;
		document.getElementById("interestOutput").innerHTML = `${interestRate}%`;

		let tableOut = "";
		let currPrinc = loanAmount;
		let intPayment = 0;
		let totalInt = 0;
		let princPayment = 0;
		//Loop to fill the table
		for (let loop = 1; loop <= term; loop++) {
			intPayment = currPrinc * (interestRate / 1200);
			princPayment = mPayment - intPayment;
			totalInt = totalInt + intPayment;
			currPrinc = currPrinc - princPayment;
			tableOut += '<tr>';
			tableOut += `<td>${loop}</td>`;
			tableOut += `<td>${formatter.format(mPayment)}</td>`;
			tableOut += `<td>${formatter.format(princPayment)}</td>`;
			tableOut += `<td>${formatter.format(intPayment)}</td>`;
			tableOut += `<td>${formatter.format(totalInt)}</td>`;
			tableOut += `<td>${formatter.format(currPrinc)}</td>`
			tableOut += '</tr>';
		}
		tableOut += "<thead><tr><th>Month</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Total Interest</th><th>Balance</th></tr></thead>"
		tableOut += "<tfoot><tr><th>Month</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Total Interest</th><th>Balance</th></tr></tfoot>"
		document.getElementById("dataTable").innerHTML = tableOut;
	}

	// Call the dataTables jQuery plugin
	$(document).ready(function () {
		$('#dataTable').DataTable();
	});
}
