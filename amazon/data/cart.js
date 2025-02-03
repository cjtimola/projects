import {deliveryOptions} from './deliveryOptions.js';

export let cart;

loadFromStorage();

export function loadFromStorage () {
  cart = JSON.parse(localStorage.getItem('cart')) || [
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
}

export function saveToStorage () {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart (productId, quantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += Number(quantity) || 1;
  } else {
    cart.push({
      productId,
      quantity: Number(quantity) || 1,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart (productId) {
  cart = cart.filter(cartItem => cartItem.productId !== productId);;
  saveToStorage();
}

export function updateCartQuantity () {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });


  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}

export function updateDeliveryOption (productId, deliveryOptionId) {
  let isProductIdExists = false;
  let isDeliveryOptionIdExists = false;

  cart.forEach((cartItem) => {
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

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
  }
}

export async function loadCartFetch() {
  const response = await fetch('https://supersimplebackend.dev/cart');
  const responseText = await response.text();
  console.log(responseText);
}

export function loadCart (fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart')
  xhr.send();
}