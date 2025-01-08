let calculation = localStorage.getItem('calculation') || '';

      displayCalculation();

      function calculate () {
        calculation = eval(document.querySelector('.js-calculation').innerHTML);

        localStorage.setItem('calculation', calculation);

        displayCalculation();
      }

      function clearCalculation () {
        localStorage.removeItem('calculation');

        calculation = '';

        displayCalculation();
      }

      function updateCalculation (value) {
        calculation += value;

        displayCalculation();

        localStorage.setItem('calculation', calculation);
      }

      function displayCalculation () {
        document.querySelector('.js-calculation').
          innerHTML = calculation;
      }