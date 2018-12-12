const PubSub = require('../helpers/pub_sub.js');
const DiceView = require('./dice_view.js');
const Dice = require('../models/dice.js');

const RollView = function (rollContainer) {
  this.rollContainer = rollContainer;
  this.diceElement = new DiceView();
  this.currentPlayer;
  this.dice = new Dice();
  this.animHelper = true;
  this.diceAudio = document.getElementById('dice-audio');
  this.diceAngle = 0;
  this.rollButton;
  this.marginLeft;
};

RollView.prototype.bindEvents = function () {
  PubSub.subscribe('Game:current-player', (evt) => {
    this.animHelper = true;
    this.currentPlayer = evt.detail;
    this.render(this.currentPlayer);
    this.diceElement.active = true;
  })

  PubSub.subscribe('Player:roll-result', (evt) => {

    this.diceElement.render(evt.detail.diceroll);
    // const numRolled = evt.detail;
    // const numRolledElement = document.createElement('p');
    // numRolledElement.id = "roll-result";
    // numRolledElement.textContent = `${numRolled}`;
    // this.rollContainer.appendChild(numRolledElement);

  });
  PubSub.subscribe('RollView:animation-helper', () => {
    this.rollAnimation();
  })

  this.diceAudio.addEventListener('ended', (event) => {
    this.animHelper = false;
    this.diceAngle = 0;
    this.rollButton.style.transform = `rotate(${this.diceAngle}deg)`;
    PubSub.publish('RollView:dice-clicked', this.currentPlayer.id);
  })

};

RollView.prototype.render = function (player) {

  this.rollContainer.innerHTML = '';

  const instructionA = document.createElement('p');
  instructionA.classList.add('roll-instruction');

  const nameBold = document.createElement('strong');
  nameBold.textContent = player.name;

  const lineBreak = document.createElement('br');

  const turnLine = document.createElement('div');
  turnLine.classList.add('roll-instruction-second-line');
  turnLine.textContent = "It is your turn!"

  instructionA.appendChild(nameBold);
  instructionA.appendChild(lineBreak);
  instructionA.appendChild(turnLine);

  this.rollContainer.appendChild(instructionA);

  this.rollButton = document.getElementById('dice-result');

  const rollInstruction = document.querySelector(".roll-click-text");
  rollInstruction.style.display = 'inherit';

  this.rollButton.addEventListener('click', (evt) => {
    if (this.diceElement.active) {
      this.diceElement.active = false;

      this.diceAudio.play();

      const rollInstruction = document.querySelector(".roll-click-text");
      const turnInstruction = document.querySelector(".roll-instruction-second-line");

      rollInstruction.style.display = 'none';
      turnInstruction.style.display = 'none';

      this.rollAnimation();


      // rollButton.disabled = true;
    }
  });
};

RollView.prototype.rollAnimation = function () {
  if (!this.animHelper) {return}
  const randomRoll = this.dice.roll();
  this.diceElement.render(randomRoll);
  console.log('run');
  const chosenAngle = 50;
  this.diceAngle += chosenAngle;
  this.rollButton.style.transform = `rotate(${this.diceAngle}deg)`;
  window.setTimeout(this.animationHelper, 40);
};

RollView.prototype.animationHelper = () => {
  PubSub.publish('RollView:animation-helper', true)
};

module.exports = RollView;

// 32.7 degrees
