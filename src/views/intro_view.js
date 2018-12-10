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
  this.addPlayerEntry('1', playerEntryForm);
  this.addPlayerEntry('2', playerEntryForm);
  this.addSubmit(playerEntryForm);

  introViewElement.appendChild(playerEntryForm);

  playerEntryForm.addEventListener('submit', (event) => {
    PubSub.publish('IntroForm:player-details-entered', event.target.value)
  })

};


IntroView.prototype.addPlayerEntry = function (player, form) {
  const label = document.createElement('label')
  label.textContent = `Player ${player}, enter your name:`
  form.appendChild(label);

  const entry = document.createElement('input')
  entry.setAttribute('type', 'text')
  entry.setAttribute('name', `${player}`)
  entry.setAttribute('value', `Player ${player}`)
  form.appendChild(entry)
};

IntroView.prototype.addSubmit = function (form) {
  const introSubmit = document.createElement('input');
  introSubmit.setAttribute('type', 'submit');
  introSubmit.setAttribute('value', 'Start Game');
  form.appendChild(introSubmit);
};





module.exports = IntroView;
