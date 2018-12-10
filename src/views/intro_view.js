const PubSub = require('../helpers/pub_sub.js')

const IntroView = function (parentElement) {
  this.parentElement = parentElement;
  this.player1 = null;
  this.player2 = null;
}


IntroView.prototype.bindEvents = function () {
  this.createIntroForm();
};

IntroView.prototype.createIntroForm = function () {
  const introViewElement = document.createElement('div');
  introViewElement.id = 'win-view';
  this.parentElement.appendChild(introViewElement);

  const playerEntryForm = document.createElement('form');

  const playerOneLabel = document.createElement('label')
  playerOneLabel.textContent = "Player One, enter your name:"
  playerEntryForm.appendChild(playerOneLabel)

  const playerOneEntry = document.createElement('input')
  playerOneEntry.setAttribute('type', 'text')
  playerOneEntry.setAttribute('value', 'player1')
  playerEntryForm.appendChild(playerOneEntry)

  const playerTwoLabel = document.createElement('label')
  playerTwoLabel.textContent = "Player Two, enter your name:"
  playerEntryForm.appendChild(playerTwoLabel)

  const playerTwoEntry = document.createElement('input')
  playerTwoEntry.setAttribute('type', 'text')
  playerTwoEntry.setAttribute('value', 'player2')
  playerEntryForm.appendChild(playerTwoEntry)

  const introSubmit = document.createElement('input');
  introSubmit.setAttribute('type', 'submit');
  introSubmit.setAttribute('value', 'Start Game');
  playerEntryForm.appendChild(introSubmit);


  introViewElement.appendChild(playerEntryForm)
};



module.exports = IntroView;
