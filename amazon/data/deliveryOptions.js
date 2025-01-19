import daysjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function calculateDeliveryDate (deliveryOption) {
  const today = daysjs();
  
  let deliveryDate = today;

  let deliveryDays = deliveryOption.deliveryDays;

  while (deliveryDays) {
    deliveryDate = deliveryDate.add(
      1,
      'days'
    );

    const dayOfWeek = deliveryDate.format(
      'dddd'
    );

    if (dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday') {
      continue;
    }

    deliveryDays --;
  }

  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );

  return dateString;
}

export function getDeliveryOption (deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (deliveryOptionId === option.id) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];