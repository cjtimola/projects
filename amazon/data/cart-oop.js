import {deliveryOptions} from './deliveryOptions.js';

function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage () {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }
      ];  
    },

    saveToStorage () {
      localStorage.setItem('localStorageKey', JSON.stringify(this.cartItems));
    },

    addToCart (productId, quantity) {
      let matchingItem;
    
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
    
      if (matchingItem) {
        matchingItem.quantity += Number(quantity) || 1;
      } else {
        this.cartItems.push({
          productId,
          quantity: Number(quantity) || 1,
          deliveryOptionId: '1'
        });
      }
    
      this.saveToStorage();
    },

    removeFromCart (productId) {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);;
      this.saveToStorage();
    },

    updateCartQuantity () {
      let cartQuantity = 0;
    
      this.cartItems.forEach((item) => {
        cartQuantity += item.quantity;
      });
    
    
      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
    },

    updateDeliveryOption (productId, deliveryOptionId) {
      let isProductIdExists = false;
      let isDeliveryOptionIdExists = false;
    
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          isProductIdExists = true;
        }
      });
    
      deliveryOptions.forEach((deliveryOption) => {
        if (deliveryOptionId === deliveryOption.id) {
          isDeliveryOptionIdExists = true;
        }
      });
    
      if (isProductIdExists && isDeliveryOptionIdExists) {
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
    
        matchingItem.deliveryOptionId = deliveryOptionId;
    
        this.saveToStorage();
      }
    }

  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart)
console.log(businessCart)