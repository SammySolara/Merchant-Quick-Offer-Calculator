// Function to calculate the merchant's effective rate
document.getElementById("totalFees").addEventListener("input", function() {
    const grossRevenue = parseFloat(document.getElementById("grossRevenue").value) || 0;
    const totalFees = parseFloat(document.getElementById("totalFees").value) || 0;
    
    if (grossRevenue > 0) {
        const effectiveRate = (totalFees / grossRevenue) * 100;
        document.getElementById("calculatedEffectiveRate").value = effectiveRate.toFixed(2);
        document.getElementById("currentRate").value = effectiveRate.toFixed(2);
    }
});

// Function to generate the offer
document.getElementById("offerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get input values
    const grossRevenue = parseFloat(document.getElementById("grossRevenue").value) || 0;
    const dualPricing = document.getElementById("dualPricing").value;
    const averageTicket = parseFloat(document.getElementById("averageTicket").value) || 0;
    const calculationMethod = document.getElementById("calculationMethod").value;
    const transactionCount = parseFloat(document.getElementById("transactionCount").value) || 0;
    
    // Get rates (allow user to manually enter current rate if known)
    let currentRate = parseFloat(document.getElementById("currentRate").value) / 100;
    let newRate = parseFloat(document.getElementById("newRate").value) / 100;
    let currentFlatFee = parseFloat(document.getElementById("currentFlatFee").value) || 0;
    let newFlatFee = parseFloat(document.getElementById("newFlatFee").value) || 0;

    let currentFees, newFees, monthlySavings;

    if (calculationMethod === "effectiveRate") {
        currentFees = grossRevenue * currentRate;
        newFees = grossRevenue * newRate;
    } else {
        currentFees = (grossRevenue * currentRate) + (transactionCount * currentFlatFee);
        newFees = (grossRevenue * newRate) + (transactionCount * newFlatFee);
    }

    monthlySavings = currentFees - newFees;

    // If dual pricing, merchant pays $0 fees, savings = previous fees
    if (dualPricing === "yes") {
        newFees = 0;
        monthlySavings = currentFees;
    }

    const annualSavings = monthlySavings * 12;
    const threeYearSavings = annualSavings * 3;

    // Extra cost per transaction if dual pricing
    let customerExtraCost = dualPricing === "yes" ? ((averageTicket * newRate) + newFlatFee).toFixed(2) : "0.00";

    // Display results
    document.getElementById("currentRateDisplay").innerText = (currentRate * 100).toFixed(2) + "%";
    document.getElementById("newRateDisplay").innerText = (newRate * 100).toFixed(2) + "%";
    document.getElementById("currentFeesDisplay").innerText = "$" + currentFees.toFixed(2);
    document.getElementById("newFeesDisplay").innerText = "$" + newFees.toFixed(2);
    document.getElementById("monthlySavings").innerText = "$" + monthlySavings.toFixed(2);
    document.getElementById("annualSavings").innerText = "$" + annualSavings.toFixed(2);
    document.getElementById("threeYearSavings").innerText = "$" + threeYearSavings.toFixed(2);
    document.getElementById("customerExtraCost").innerText = "$" + customerExtraCost;

    document.getElementById("offerResults").classList.remove("hidden");
});
