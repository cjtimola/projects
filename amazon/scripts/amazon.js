import {cart} from '../data/cart-class.js';
import {products, loadProducts} from '../data/products.js';
import formatCurrency from './utils/money.js';

loadProducts(renderProductsGrid);

function renderProductsGrid () {

  let searchProducts = [];

  const url = new URL(window.location.href);
  document.querySelector('.js-search-bar').value = url.searchParams.get('search');

  let searchValue = document.querySelector('.js-search-bar').value;
      
  searchProducts = products.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));

  document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      searchValue = document.querySelector('.js-search-bar').value;

      if (searchValue === '') {
        window.location.href = 'amazon.html';
      } else {
        window.location.href = `amazon.html?search=${searchValue}`;
      }

    })

  let productsHTML = '';

  searchProducts.forEach((product) => {
    productsHTML += `
      <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}">
              Add to Cart
            </button>
          </div>
    `;
  });

  document.querySelector('.js-product-grid')
    .innerHTML = productsHTML;

  cart.updateCartQuantity();

  const addedMessageTimeouts = {};

  function addMessage (addedMessageTimeouts, productId) {
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

    addedMessage.classList.add('added-to-cart-visible');

    const previousTimeoutId = addedMessageTimeouts[productId];
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-visible');
    }, 2000);

    addedMessageTimeouts[productId] = timeoutId;
  }

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const quantity = document.querySelector(`.js-quantity-selector-${productId}`).value;

        addMessage(addedMessageTimeouts, productId);
        cart.addToCart(productId, quantity);
        cart.updateCartQuantity();
      });
    });
    
}