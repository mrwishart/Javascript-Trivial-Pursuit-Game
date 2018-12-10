const PubSub = require('../helpers/pub_sub.js');
const DiceView = require('./dice_view.js');

const RollView = function (rollContainer) {
  this.rollContainer = rollContainer;
  this.diceElement = new DiceView();
  this.currentPlayer;
}

RollView.prototype.bindEvents = function () {
  PubSub.subscribe('Game:current-player', (evt) => {
    this.currentPlayer = evt.detail;
    this.render(this.currentPlayer);
    this.diceElement.active = true;
  })

  PubSub.subscribe('Player:roll-result', (evt) => {
    this.diceElement.render(evt.detail);
    // const numRolled = evt.detail;
    // const numRolledElement = document.createElement('p');
    // numRolledElement.id = "roll-result";
    // numRolledElement.textContent = `${numRolled}`;
    // this.rollContainer.appendChild(numRolledElement);
  });
};

RollView.prototype.render = function (player) {

  this.rollContainer.innerHTML = '';

  const instruction = document.createElement('p');
  instruction.classList.add('roll-instruction');
  instruction.textContent = `${player.name}, it's your turn!`;
  this.rollContainer.appendChild(instruction);
  //
  // const rollButton = document.createElement('button');
  // rollButton.textContent = 'Roll!'
  // this.rollContainer.appendChild(rollButton);

  const rollButton = document.getElementById('dice-result');

  rollButton.addEventListener('click', (evt) => {
    if (this.diceElement.active) {
    console.log(player);
    PubSub.publish('RollView:dice-clicked', this.currentPlayer.id);
    // rollButton.disabled = true;
    this.diceElement.active = false;
  }
  });
}

  module.exports = RollView;
