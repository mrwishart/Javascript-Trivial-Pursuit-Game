const PubSub = require('../helpers/pub_sub.js');

const RollView = function (rollContainer) {
  this.rollContainer = rollContainer;
}

RollView.prototype.bindEvents = function () {
  PubSub.subscribe('Game:current-player', (evt) => {
    const playerId = evt.detail;
    this.render(playerId)
  })

  PubSub.subscribe('Player:roll-result', (evt) => {
    const previousRoll = document.getElementById("roll-result");
    if (previousRoll) {
      previousRoll.innerHTML = '';
    }

    const numRolled = evt.detail;
    const numRolledElement = document.createElement('p');
    numRolledElement.id = "roll-result";
    numRolledElement.textContent = `${numRolled}`;
    this.rollContainer.appendChild(numRolledElement);
  });
};

RollView.prototype.render = function (playerId) {
  // const parentElement = document.querySelector('#display-view');

  this.rollContainer.innerHTML = '';
  // rollContainer.classList.add('roll-container');
  // parentElement.appendChild(rollContainer);

  const instruction = document.createElement('p');
  instruction.textContent = `Player ${playerId}, it's your turn!`;
  this.rollContainer.appendChild(instruction);

  const rollButton = document.createElement('button');
  rollButton.textContent = 'Roll!'
  this.rollContainer.appendChild(rollButton);

  rollButton.addEventListener('click', (evt) => {
    PubSub.publish('RollView:dice-clicked', playerId);
  });
}

  module.exports = RollView;
