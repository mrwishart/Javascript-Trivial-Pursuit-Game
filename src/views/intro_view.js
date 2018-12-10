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
  const addPlayerNumber = this.addPlayerNumberSelect(playerEntryForm);
  this.addLineBreak(playerEntryForm);
  this.addLineBreak(playerEntryForm);
  this.addPlayerEntry('1', playerEntryForm);
  this.addLineBreak(playerEntryForm);
  this.addLineBreak(playerEntryForm);
  this.addPlayerEntry('2', playerEntryForm);
  this.addLineBreak(playerEntryForm);
  this.addLineBreak(playerEntryForm);


  this.introElement.appendChild(playerEntryForm);

  playerEntryForm.addEventListener('change', (event) => {
    console.log('event', event.target.value);
    if (event.target.value == 3){
      this.addLineBreak(playerEntryForm);
      this.addPlayerEntry('3', playerEntryForm);
    } else if (event.target.value == 4){
      this.addLineBreak(playerEntryForm);
      this.addPlayerEntry('3', playerEntryForm);
      this.addLineBreak(playerEntryForm);
      this.addPlayerEntry('4', playerEntryForm);
      this.addLineBreak(playerEntryForm);
    }
  }),

  this.addSubmit(playerEntryForm);

  playerEntryForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const firstPlayerName = document.getElementById('1').value
    const secondPlayerName = document.getElementById('2').value
    const playerNames = {
      1: firstPlayerName,
      2: secondPlayerName}

      PubSub.publish('IntroForm:player-details-entered', playerNames);

      this.introElement.parentNode.removeChild(this.introElement);

    })

  };

  IntroView.prototype.addPlayerNumberSelect = function (form) {
    const label = document.createElement('label');
    label.textContent = "This will be a game for ";
    form.appendChild(label)
    const numberSelect = document.createElement('select')
    const twoPlayers = document.createElement('option')
    twoPlayers.textContent = "Two Players"
    numberSelect.appendChild(twoPlayers)
    const threePlayers = document.createElement('option')
    threePlayers.textContent = "Three Players"
    threePlayers.value = 3
    numberSelect.appendChild(threePlayers)
    const fourPlayers = document.createElement('option')
    fourPlayers.textContent = "Four Players"
    fourPlayers.value = 4
    numberSelect.appendChild(fourPlayers)
    form.appendChild(numberSelect)
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

  IntroView.prototype.addLineBreak = function (form) {
    lineBreak = document.createElement('br')
    form.appendChild(lineBreak)
  };




  module.exports = IntroView;
