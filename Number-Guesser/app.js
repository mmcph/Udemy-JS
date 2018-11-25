let goal;
let maxGuesses = 4;
let guessesLeft;
let min = 1;
let max = 10;

const guess = document.querySelector('#guess-input');
const guessSub = document.querySelector('#guess-value');
const outputText = document.querySelector('.message');

function randomNum() {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

newGame();

function newGame() {
  guessesLeft = maxGuesses;
  goal = randomNum();
  console.log(goal);
  guess.value = '';
}

// anon fn to start new when text = newgame
guessSub.addEventListener('click', checkGuess);

function checkGuess() {
  if (guess.value === '') return;
  thisGuess = parseInt(guess.value);
  if (max < thisGuess < min) {
    if (thisGuess === goal) {
      console.log('You guessed correctly.');
      outputText.style.color = 'green';
      outputText.textContent = 'You guessed correctly.';
      newGame();
    } else {
      guessesLeft--;
      if (guessesLeft === 0) {
        console.log('You lose, try again.');
        outputText.style.color = 'red';
        outputText.textContent = 'You lose, try again.';
        newGame();
      } else {
        console.log(`Incorrect. You have ${guessesLeft} guesses left.`)
        outputText.style.color = 'orange';
        outputText.textContent = `Incorrect. You have ${guessesLeft} guesses left.`;
        guess.value = '';
      }
    }
  } else {
    guess.value = '';
  }
}
