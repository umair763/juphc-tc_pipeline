/**
 * Tax Calculator Module
 * Calculates income tax based on progressive tax brackets:
 * - $0 - $10,000: 0%
 * - $10,001 - $50,000: 10%
 * - $50,001 - $100,000: 20%
 * - Over $100,000: 30%
 */

function calculateTax(income) {
  if (typeof income !== 'number' || isNaN(income)) {
    throw new Error('Invalid income: Income must be a valid number');
  }

  if (income < 0) {
    throw new Error('Invalid income: Income cannot be negative');
  }

  if (income <= 10000) {
    return 0;
  }

  let tax = 0;
  let remainingIncome = income;

  if (remainingIncome > 100000) {
    tax += (remainingIncome - 100000) * 0.30;
    remainingIncome = 100000;
  }

  if (remainingIncome > 50000) {
    tax += (remainingIncome - 50000) * 0.20;
    remainingIncome = 50000;
  }

  if (remainingIncome > 10000) {
    tax += (remainingIncome - 10000) * 0.10;
  }

  return Math.round(tax * 100) / 100;
}

// Export for CommonJS (Node/Jasmine) and browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculateTax };
}
