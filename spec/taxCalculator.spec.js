const { calculateTax } = require('../taxCalculator.js');

describe('Tax Calculator Unit Tests', () => {
  it('should return 0 tax for an annual income of 0', () => {
    const tax = calculateTax(0);
    expect(tax).toEqual(0);
  });

  it('should return 0 tax for income within the first tax-free slab ($0 - $10,000)', () => {
    const tax = calculateTax(8000);
    expect(tax).toEqual(0);
  });

  it('should calculate 10% tax for income in the second bracket ($10,001 - $50,000)', () => {
    const tax = calculateTax(30000);
    // (30000 - 10000) * 0.10 = 2000
    expect(tax).toEqual(2000);
  });

  it('should calculate correct progressive tax for income in the third bracket ($50,001 - $100,000)', () => {
    const tax = calculateTax(80000);
    // (40000 * 0.10) + (30000 * 0.20) = 4000 + 6000 = 10000
    expect(tax).toEqual(10000);
  });

  it('should calculate correct progressive tax for income exceeding $100,000 in the top bracket', () => {
    const tax = calculateTax(150000);
    // (40000 * 0.10) + (50000 * 0.20) + (50000 * 0.30) = 4000 + 10000 + 15000 = 29000
    expect(tax).toEqual(29000);
  });

  it('should throw an error for negative income values', () => {
    expect(() => {
      calculateTax(-5000);
    }).toThrowError('Invalid income: Income cannot be negative');
  });

  it('should throw an error for non-numeric or invalid income input', () => {
    expect(() => {
      calculateTax('invalid');
    }).toThrowError('Invalid income: Income must be a valid number');
  });
});
