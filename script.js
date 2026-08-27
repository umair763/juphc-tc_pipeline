document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('tax-form');
  const incomeInput = document.getElementById('annual-income');
  const resultsSection = document.getElementById('results');
  const grossIncomeDisplay = document.getElementById('gross-income-display');
  const totalTaxDisplay = document.getElementById('total-tax-display');
  const netPayDisplay = document.getElementById('net-pay-display');
  const effectiveRateDisplay = document.getElementById('effective-rate-display');
  const breakdownBody = document.getElementById('breakdown-body');

  function formatCurrency(num) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(num);
  }

  function getTaxBreakdown(income) {
    const brackets = [
      { name: '$0 - $10,000', rate: 0.00, lower: 0, upper: 10000 },
      { name: '$10,001 - $50,000', rate: 0.10, lower: 10000, upper: 50000 },
      { name: '$50,001 - $100,000', rate: 0.20, lower: 50000, upper: 100000 },
      { name: 'Over $100,000', rate: 0.30, lower: 100000, upper: Infinity }
    ];

    return brackets.map(bracket => {
      let taxableInBracket = 0;
      if (income > bracket.lower) {
        taxableInBracket = Math.min(income, bracket.upper) - bracket.lower;
      }
      const taxInBracket = taxableInBracket * bracket.rate;
      return {
        name: bracket.name,
        rateFormatted: `${(bracket.rate * 100).toFixed(0)}%`,
        taxable: taxableInBracket,
        taxOwed: taxInBracket
      };
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const income = parseFloat(incomeInput.value);

    if (isNaN(income) || income < 0) {
      alert('Please enter a valid, non-negative annual income.');
      return;
    }

    try {
      const totalTax = calculateTax(income);
      const netPay = income - totalTax;
      const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;

      grossIncomeDisplay.textContent = formatCurrency(income);
      totalTaxDisplay.textContent = formatCurrency(totalTax);
      netPayDisplay.textContent = formatCurrency(netPay);
      effectiveRateDisplay.textContent = `${effectiveRate.toFixed(2)}%`;

      const breakdown = getTaxBreakdown(income);
      breakdownBody.innerHTML = '';

      breakdown.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.rateFormatted}</td>
          <td>${formatCurrency(item.taxable)}</td>
          <td>${formatCurrency(item.taxOwed)}</td>
        `;
        breakdownBody.appendChild(row);
      });

      resultsSection.classList.remove('hidden');
    } catch (err) {
      alert(err.message);
    }
  });
});

