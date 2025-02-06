
/**
 * Burger Interactive
 */
document.querySelector('.js-burger-icon')
  .addEventListener('click', () => {
    const rightNavContainer = document.querySelector('.js-right-nav-container');

    rightNavContainer.classList.toggle('right-nav-container-visible');

    if (rightNavContainer.classList.contains('right-nav-container-visible')) {
      document.querySelector('.js-burger-icon').src = 'images/cross.png';
    } else {
      document.querySelector('.js-burger-icon').src = 'images/menu.png';
    }
  });