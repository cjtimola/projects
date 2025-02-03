import {orders, getOrder} from '../data/orders.js';
import {cart} from '../data/cart-class.js';
import {products, loadProductsFetch, getProduct} from '../data/products.js';
import {getDayDate, getMonthString, getWeekDay} from './utils/date.js';

async function loadPage () {
  try {
    await loadProductsFetch();
  } catch (error) {
    console.log('Unexpected error. Please try again later');
  }

  renderTrackingSummary();
}

loadPage();

function renderTrackingSummary () {
  document.querySelector('.js-cart-quantity')
  .innerHTML = cart.countCartQuantity();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  let orderProduct;

  const matchingProduct = getProduct(productId);
  const matchingOrder = getOrder(orderId);

  
  matchingOrder.products.forEach((product) => {
    if (product.productId === productId) {
      orderProduct = product;
    }
  });
  
  const estimatedDeliveryTime = orderProduct.estimatedDeliveryTime;
  
  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${getWeekDay(estimatedDeliveryTime)}, ${getMonthString(estimatedDeliveryTime)} ${getDayDate(estimatedDeliveryTime)}
    </div>

    <div class="product-info">
      ${matchingProduct.name}
    </div>

    <div class="product-info">
      Quantity: ${orderProduct.quantity}
    </div>

    <img class="product-image" src="${matchingProduct.image}">

    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking')
    .innerHTML = trackingHTML;

}