import {cart} from '../data/cart-class.js';

document.querySelector('.js-cart-quantity')
  .innerHTML = cart.countCartQuantity();

  