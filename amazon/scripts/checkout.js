import renderCheckoutHeader from './checkout/checkoutHeader.js';
import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import {loadCart} from '../data/cart.js';
// import '../scripts/backend-practice.js';

async function loadPage () {
  try {
    // throw 'Error 1';
    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      // throw 'Error 2';

      loadCart(() => {
        // reject();
        resolve('value3');
      });
    });
  } catch (error) {
    console.log('Unexpected error. Please try again later');
  }

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary(); 

}

loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
]).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary(); 
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });
}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
loadProducts(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary(); 
});
*/