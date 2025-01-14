import {cart, removeFromCart, updateCartQuantity, saveToStorage} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  
  cartSummaryHTML += `
    <div class="cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
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
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

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