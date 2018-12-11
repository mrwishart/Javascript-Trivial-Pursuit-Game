const PubSub = require('../helpers/pub_sub.js')

const IntroView = function (parentElement) {
  this.parentElement = parentElement;
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
  this.addSubmit(playerEntryForm);
  this.addLineBreak(playerEntryForm);
  const numberSelect = this.addPlayerNumberSelect(playerEntryForm);
  console.log(numberSelect);
  this.addLineBreak(playerEntryForm);
  this.addLineBreak(playerEntryForm);
  const playerFieldsDiv = document.createElement('div');
  playerFieldsDiv.classList.add('player-fields-div');
  playerEntryForm.appendChild(playerFieldsDiv);

  this.addPlayerEntry(1, playerFieldsDiv);
  this.addLineBreak(playerFieldsDiv);
  this.addLineBreak(playerFieldsDiv);
  this.addPlayerEntry(2, playerFieldsDiv);
  this.addLineBreak(playerFieldsDiv);


  this.introElement.appendChild(playerEntryForm);

  numberSelect.addEventListener('change', (event) => {
    console.log('event', event.target);
    playerFieldsDiv.innerHTML = '';
    for (let i = 1; i <= event.target.value; i++) {
      this.addLineBreak(playerFieldsDiv);
      this.addPlayerEntry(i, playerFieldsDiv);
      this.addLineBreak(playerFieldsDiv);
    }
  });


  playerEntryForm.addEventListener('submit', (event) => {
    console.log("event is:", event.target);
    event.preventDefault()
    console.log(event.target);
    const playerNames = {};
    const firstPlayerName = document.getElementById('name1').value;
    playerNames[1] = firstPlayerName;
    const secondPlayerName = document.getElementById('name2').value;
    playerNames[2] = secondPlayerName;
    if (document.getElementById('name3')) {
      const thirdPlayerName = document.getElementById('name3').value;
      playerNames[3] = thirdPlayerName;
    }
    if (document.getElementById('name4')) {
      const fourthPlayerName = document.getElementById('name4').value;
      playerNames[4] = fourthPlayerName;
    }
      PubSub.publish('IntroForm:player-details-entered', playerNames);

      this.introElement.parentNode.removeChild(this.introElement);

    })

  };


  IntroView.prototype.methodName = function () {

  };

  IntroView.prototype.addPlayerNumberSelect = function (form) {
    const label = document.createElement('label');
    label.textContent = "This will be a game for ";
    form.appendChild(label)
    const numberSelect = document.createElement('select')
    numberSelect.classList.add('intro-select');
    const twoPlayers = document.createElement('option')
    twoPlayers.textContent = "Two Players"
    twoPlayers.value = 2
    twoPlayers.selected = true
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
    return numberSelect
  };


  IntroView.prototype.addPlayerEntry = function (player, div) {
    const label = document.createElement('label')
    label.textContent = `Player ${player}, enter your name:`
    div.appendChild(label);

    const entry = document.createElement('input')
    entry.setAttribute('type', 'text')
    entry.id = `name${player}`;
    entry.maxLength = 12;
    entry.setAttribute('name', `name`)
    entry.setAttribute('value', `Player ${player}`)
    div.appendChild(entry)
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
