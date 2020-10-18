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
		Swal.fire({
			title: 'Error!',
			text: 'Inputs can not be blank',
			icon: 'warning',
			confirmButtonText: 'Back'
		})
	} else {
		// outputting total cost
		let tCost = `${formatMoney(totalCost(monthlyInterestRate(interestRate), loanAmount, term), 2, ".", ",")}`;
		document.getElementById("totalCostSpan").innerHTML = `$${tCost}`;
		// outputting total interest
		let tInterest = `${formatMoney(totalInterest(totalCost(monthlyInterestRate(interestRate), loanAmount, term), loanAmount), 2, ".", ",")}`;
		document.getElementById("totalInterestSpan").innerHTML = `$${tInterest}`;

		// outputting monthly payment
		let mPayment = `${monthlyPayment(totalCost(monthlyInterestRate(interestRate), loanAmount, term), term)}`
		document.getElementById("monthlyPaymentSpan").innerHTML = `$${formatMoney(mPayment, 2, ".", ",")}`;
		

		document.getElementById("loanOutput").innerHTML = `$${formatMoney(loanAmount, 2, ".", ",")}`;
		document.getElementById("termOutput").innerHTML = `${term} Months`;
		document.getElementById("interestOutput").innerHTML = `${interestRate}%`;

		let tableOut = "<tbody>";
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
			tableOut += `<td>$${formatMoney(mPayment, 2, ".", ",")}</td>`;
			tableOut += `<td>$${formatMoney(princPayment, 2, ".", ",")}</td>`;
			tableOut += `<td>$${formatMoney(intPayment, 2, ".", ",")}</td>`;
			tableOut += `<td>$${formatMoney(totalInt, 2, ".", ",")}</td>`;
			tableOut += `<td>$${formatMoney(currPrinc, 2, ".", ",")}</td>`
			tableOut += '</tr>';
		}
		tableOut += "</tbody>";
		tableOut += "<thead><tr><th>Month</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Total Interest</th><th>Balance</th></tr></thead>"
		tableOut += "<tfoot><tr><th>Month</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Total Interest</th><th>Balance</th></tr></tfoot>"
		document.getElementById("dataTable").innerHTML = tableOut;
	}


	
}