import {orders} from '../data/orders.js';
import {cart} from '../data/cart-class.js';
import {products, loadProductsFetch, getProduct} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import {getDayDate, getMonthString} from './utils/date.js';

async function loadPage () {
  try {
    await loadProductsFetch();
  } catch (error) {
    console.log('Unexpected error. Please try again later');
  }

  renderOrdersSummary();
}

loadPage();

function renderOrdersSummary () {
  document.querySelector('.js-cart-quantity')
    .innerHTML = cart.countCartQuantity();

  let ordersSummaryHTML = '';
  orders.forEach((order) => {
    let orderDetailsHTML = '';

    order.products.forEach((product) => {
      const matchingProduct = getProduct(product.productId);

      orderDetailsHTML += `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${getMonthString(product.estimatedDeliveryTime)} ${getDayDate(product.estimatedDeliveryTime)}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again-button"
            data-product-id="${product.productId}" data-quantity="${product.quantity}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    ordersSummaryHTML += `
      <div class="order-container">   
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${getMonthString(order.orderTime)} ${getDayDate(order.orderTime)}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${orderDetailsHTML}
        </div>
      </div>
    `;

    
  });

  document.querySelector('.js-orders-grid')
    .innerHTML = ordersSummaryHTML;

  document.querySelectorAll('.js-buy-again-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const {productId, quantity} = button.dataset;

        cart.addToCart(productId, quantity);
        renderOrdersSummary();
      });
    });
}