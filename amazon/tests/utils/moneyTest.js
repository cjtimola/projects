import {formatCurrency} from '../../scripts/utils/money.js';

describe('test suite: formatCurrency:', () => {
  it('converts cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent', () => {
    expect(formatCurrency(1000.5)).toEqual('10.01');
  });

  it('rounds down to the nearest cent', () => {
    expect(formatCurrency(1000.4)).toEqual('10.00');
  });
});