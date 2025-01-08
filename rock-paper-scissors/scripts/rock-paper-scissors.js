const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

function displayScore () {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

displayScore();

function pickComputerMove () {
  
  // Generate Random Number
  const randomNumber = Math.random();     

  // Convert randomNumber to Computer Move
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    return 'rock';

  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    return 'paper';

  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    return 'scissors';
    
  }
}

function playGame (playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  // Compare computer move to player move to get result.
  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You won.';
    }

  } else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
        result = 'You won.';
      } else if (computerMove === 'paper') {
        result = 'Tie.';
      } else if (computerMove === 'scissors') {
        result = 'You lose.';
      }

  } else if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You won.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  }

  if (result === 'You won.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;

  displayScore();
}