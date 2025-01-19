import {cart} from '../../data/cart.js';

export default function renderCheckoutHeader () {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  let checkoutHeaderHTML = `
    Checkout (<a class="return-to-home-link"
    href="amazon.html"><span class="js-cart-quantity">${cartQuantity}</span> items</a>)
  `;

  document.querySelector('.js-checkout-header-middle-section')
    .innerHTML = checkoutHeaderHTML;
}
