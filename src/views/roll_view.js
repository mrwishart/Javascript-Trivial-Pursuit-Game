const PubSub = require('../helpers/pub_sub.js');

const RollView = function (rollContainer) {
  this.rollContainer = rollContainer;
}

RollView.prototype.bindEvents = function () {
  PubSub.subscribe('Game:current-player', (evt) => {
    const player = evt.detail;
    this.render(player)
  })

  PubSub.subscribe('Player:roll-result', (evt) => {
    const numRolled = evt.detail;
    const numRolledElement = document.createElement('p');
    numRolledElement.id = "roll-result";
    numRolledElement.textContent = `${numRolled}`;
    this.rollContainer.appendChild(numRolledElement);
  });
};

RollView.prototype.render = function (player) {

  this.rollContainer.innerHTML = '';

  const instruction = document.createElement('p');
  instruction.textContent = `${player.name}, it's your turn!`;
  this.rollContainer.appendChild(instruction);

  const rollButton = document.createElement('button');
  rollButton.textContent = 'Roll!'
  this.rollContainer.appendChild(rollButton);

  rollButton.addEventListener('click', (evt) => {
    PubSub.publish('RollView:dice-clicked', player.id);
    rollButton.disabled = true;
  });
}

  module.exports = RollView;
