export function getDayDate (date) {
  return new Date(date).getDate();
}

export function getMonthString (date) {
  return new Date(date).toLocaleString('en-us', {  month: 'long' });
}