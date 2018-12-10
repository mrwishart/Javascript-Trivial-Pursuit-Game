const PubSub = require('../helpers/pub_sub.js')

const IntroView = function (parentElement) {
  this.parentElement = parentElement;
  this.player1 = null;
  this.player2 = null;
  this.introElement = null;
}


IntroView.prototype.bindEvents = function () {
  this.createIntroForm();
};

IntroView.prototype.createIntroForm = function () {
  this.introElement = document.createElement('div');
  this.introElement.id = 'win-view';
  this.parentElement.appendChild(this.introElement);
  const playerEntryForm = document.createElement('form');
  this.addPlayerEntry('1', playerEntryForm);
  this.addPlayerEntry('2', playerEntryForm);
  this.addSubmit(playerEntryForm);

  this.introElement.appendChild(playerEntryForm);

  playerEntryForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const firstPlayerName = document.getElementById('1').value
    const secondPlayerName = document.getElementById('2').value
    const playerNames = [firstPlayerName, secondPlayerName]

    PubSub.publish('IntroForm:player-details-entered', playerNames);

    this.introElement.parentNode.removeChild(this.introElement);

  })

};


IntroView.prototype.addPlayerEntry = function (player, form) {
  const label = document.createElement('label')
  label.textContent = `Player ${player}, enter your name:`
  form.appendChild(label);

  const entry = document.createElement('input')
  entry.setAttribute('type', 'text')
  entry.id = player
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
