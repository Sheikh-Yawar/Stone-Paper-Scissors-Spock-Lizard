import  {startConfetti, stopConfetti, removeConfetti}  from  './confetti.js'
const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');


const allGameIcons = document.querySelectorAll('.far');


const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

const hitSound = new Audio("sounds/sounds_swish.m4a");
const lossSound = new Audio('sounds/sounds_aww.mp3');
const winSound = new Audio('sounds/sounds_cash.mp3');

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = ' ';


//* Reset all 'Selected' icons
const resetSelected = function () {
  allGameIcons.forEach((icon) => {
    icon.classList.remove('selected');
  });
  stopConfetti();
  removeConfetti();
}
// * Reset Score and playerChoice/Computer CHoice
const resetAll=function()
{
  playerScoreNumber=0;
  computerScoreNumber=0;
  resultText.textContent = ' ' ;
  computerScoreEl.textContent = '0';
  playerScoreEl.textContent = '0';
  computerChoiceEl.textContent = ' --- Choice';
  playerChoiceEl.textContent = ' --- Choice';
  resetSelected();
}
window.resetAll=resetAll;
//* Computer Random Choice
const computerRandomChoice = function () {
  const computerChoiceNumber = Math.floor(Math.random() * 5);
  if (computerChoiceNumber === 0)
    computerChoice = 'rock';
  else if (computerChoiceNumber === 1)
    computerChoice = 'paper';
  else if (computerChoiceNumber === 2)
    computerChoice = 'scissors';
  else if (computerChoiceNumber === 3)
    computerChoice = 'lizard';
  else {
    computerChoice = 'spock';
  }
  displayComputerChoice();
}

//* Add styling to computer choice
const displayComputerChoice = function (playerChoice) {
  //* Add  selected styling and playerChoice
  switch (computerChoice) {
    case 'rock':
      computerRock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Rock';
      break;
    case 'paper':
      computerPaper.classList.add('selected');
      computerChoiceEl.textContent = ' --- Paper';
      break;
    case 'scissors':
      computerScissors.classList.add('selected');
      computerChoiceEl.textContent = ' --- Scissors';
      break;
    case 'lizard':
      computerLizard.classList.add('selected');
      computerChoiceEl.textContent = ' --- Lizard';
      break;
    case 'spock':
      computerSpock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Spock';
      break;
    default:
      break;
  }
}

//* Check result, increase scores, update resultText
const updateScore = function (playerChoice) {
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie👔";
  }
  else {
    const choice = choices[playerChoice];
    if (choice.defeats.indexOf(computerChoice) > -1) {
      startConfetti();
      winSound.play();
      resultText.textContent = 'You won🥳';
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    }
    else {
      lossSound.play();
      resultText.textContent = 'You Lost🥲';
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }
  }

}

//* Call functions to process turn
const checkResult = function (playerChoice) {
  resetSelected();
  computerRandomChoice();
  updateScore(playerChoice)
}
//* Passing player selection value and styling icons
const  select= function (playerChoice) {
  checkResult(playerChoice);
  //* Add  selected styling and playerChoice
  switch (playerChoice) {
    case 'rock':
      playerRock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Rock';
      hitSound.play();
      break;
    case 'paper':
      playerPaper.classList.add('selected');
      playerChoiceEl.textContent = ' --- Paper';
      hitSound.play();
      break;
    case 'scissors':
      playerScissors.classList.add('selected');
      playerChoiceEl.textContent = ' --- Scissors';
      hitSound.play();
      break;
    case 'lizard':
      playerLizard.classList.add('selected');
      playerChoiceEl.textContent = ' --- Lizard';
      hitSound.play();
      break;
    case 'spock':
      playerSpock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Spock';
      hitSound.play();
      break;
    default:
      break;
  }
}

//* Make select a global function as due to type="module"  script because local scoped
window.select=select;

