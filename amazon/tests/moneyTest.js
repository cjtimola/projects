import {formatCurrency} from '../scripts/utils/money.js';

function testFormatCurreny (cents, value) {
  if (formatCurrency(cents) === value) {
    console.log('Passed');
  } else {
    console.log('Failed');
  }  
}

console.log('Converts cents into dollars');
testFormatCurreny(2095, '20.95');

console.log('Works with 0');
testFormatCurreny(0, '0.00');

console.log('Rounds up to the nearest cent');
testFormatCurreny(1000.5, '10.01');

console.log('Rounds down to the nearest cent');
testFormatCurreny(1000.4, '10.00');