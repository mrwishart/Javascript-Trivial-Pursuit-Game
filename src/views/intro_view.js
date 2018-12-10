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
  this.addPlayerEntry('player 1', playerEntryForm);
  this.addPlayerEntry('player 2', playerEntryForm);
  this.addSubmit(playerEntryForm);

  introViewElement.appendChild(playerEntryForm)

};


IntroView.prototype.addPlayerEntry = function (player, form) {
  const label = document.createElement('label')
  label.textContent = `${player}, enter your name:`
  form.appendChild(label);

  const entry = document.createElement('input')
  entry.setAttribute('type', 'text')
  entry.setAttribute('value', `${player}`)
  form.appendChild(entry)
};

IntroView.prototype.addSubmit = function (form) {
  const introSubmit = document.createElement('input');
  introSubmit.setAttribute('type', 'submit');
  introSubmit.setAttribute('value', 'Start Game');
  form.appendChild(introSubmit);
};


// const playerOneEntry = document.createElement('input')
// playerOneEntry.setAttribute('type', 'text')
// playerOneEntry.setAttribute('value', 'player1')
// playerEntryForm.appendChild(playerOneEntry)
//
// const playerTwoLabel = document.createElement('label')
// playerTwoLabel.textContent = "Player Two, enter your name:"
// playerEntryForm.appendChild(playerTwoLabel)
//
// const playerTwoEntry = document.createElement('input')
// playerTwoEntry.setAttribute('type', 'text')
// playerTwoEntry.setAttribute('value', 'player2')
// playerEntryForm.appendChild(playerTwoEntry)











module.exports = IntroView;
