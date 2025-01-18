import {cart, removeFromCart, updateCartQuantity, 
        saveToStorage, updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js';
import formatCurrency from './utils/money.js';
import daysjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (cartItem.deliveryOptionId === option.id) {
      deliveryOption = option;
    }
  });

  const today = daysjs();
  const deliveryDate = today.add(
    deliveryOption.deliveryDays,
    'days'
  );
  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );
  
  cartSummaryHTML += `
    <div class="cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link js-update-quantity-link 
              js-update-quantity-link-${matchingProduct.id}  link-primary" 
              data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input type="number" class="quantity-input js-quantity-input-${matchingProduct.id}" 
              value="${cartItem.quantity}" min="1" step="1" oninput="validity.valid||(value='');">
            <span class="save-quantity-link js-save-quantity-link js-save-quantity-link-${matchingProduct.id} link-primary" data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
  `;
});

function deliveryOptionsHTML (matchingProduct, cartItem) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    const today = daysjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );

    const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`
    ;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
  });

  return html;
}

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

updateCartQuantity();

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();

      updateCartQuantity();
    })
  });

document.querySelectorAll('.js-update-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const itemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      const saveButton = document.querySelector(`.js-save-quantity-link-${productId}`);
      const updateButton = link;
      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

      updateButton.classList.add('update-quantity-link-invisible');
      itemContainer.classList.add('is-editing-quantity');
      quantityInput.classList.add('quantity-input-visible');
      saveButton.classList.add('save-quantity-link-visible');
      quantityLabel.classList.add('quantity-label-invisible');
    })
  });

document.querySelectorAll('.js-save-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const updateButton = document.querySelector(`.js-update-quantity-link-${productId}`);
      const itemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      const saveButton = link;
      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

      let matchingItem;

      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.quantity = Number(quantityInput.value);
      quantityLabel.innerHTML = quantityInput.value;
      saveToStorage();
      updateCartQuantity();
      
      updateButton.classList.remove('update-quantity-link-invisible');
      itemContainer.classList.remove('is-editing-quantity');
      quantityInput.classList.remove('quantity-input-visible');
      saveButton.classList.remove('save-quantity-link-visible');
      quantityLabel.classList.remove('quantity-label-invisible');
    })
  });

document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
    });
  });