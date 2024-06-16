document.addEventListener('DOMContentLoaded', () => {
    const carType = document.getElementById('carType');
    const carValue = document.getElementById('carValue');
    const carValueRange = document.getElementById('carValueRange');
    const leasePeriod = document.getElementById('leasePeriod');
    const downPayment = document.getElementById('downPayment');
    const downPaymentNumber = document.getElementById('downPaymentNumber');
    const leasingCost = document.getElementById('leasingCost');
    const downPaymentAmount = document.getElementById('downPaymentAmount');
    const monthlyInstallment = document.getElementById('monthlyInstallment');
    const interestRate = document.getElementById('interestRate');

    carValue.addEventListener('input', () => carValueRange.value = carValue.value);
    carValueRange.addEventListener('input', () => carValue.value = carValueRange.value);

    downPayment.addEventListener('input', () => downPaymentNumber.value = downPayment.value);
    downPaymentNumber.addEventListener('input', () => downPayment.value = downPaymentNumber.value);

    // Function to get the interest rate based on car type
    const getInterestRate = () => carType.value === 'new' ? 2.99 : 3.7;

    // Function to update the results display
    const updateResults = () => {
        const value = parseFloat(carValue.value);
        const period = parseFloat(leasePeriod.value);
        const downPaymentPercent = parseFloat(downPayment.value);
        const downPaymentAmountValue = value * (downPaymentPercent / 100);
        const loanAmount = value - downPaymentAmountValue;
        const annualInterestRate = getInterestRate();
        const monthlyInterestRate = annualInterestRate / 100 / 12;

        const monthlyInstallmentValue = (loanAmount * monthlyInterestRate) /
            (1 - Math.pow(1 + monthlyInterestRate, -period));

        const totalCost = downPaymentAmountValue + (monthlyInstallmentValue * period);

        leasingCost.textContent = `€${totalCost.toFixed(2)}`;
        downPaymentAmount.textContent = `€${downPaymentAmountValue.toFixed(2)}`;
        monthlyInstallment.textContent = `€${monthlyInstallmentValue.toFixed(2)}`;
        interestRate.textContent = `${annualInterestRate.toFixed(2)}%`;
    };

    // Attach event listeners to all form elements
    document.querySelectorAll('input, select').forEach(element => {
        element.addEventListener('input', updateResults);
    });

    updateResults();
});
