const DiceView = function (element) {
  this.active = true;
  this.numberToDice = {
    1: [5],
    2: [3, 7],
    3: [3, 5, 7],
    4: [1, 3, 7, 9],
    5: [1, 3, 5, 7, 9],
    6: [1, 3, 4, 6, 7, 9]
  }
};


DiceView.prototype.render = function (diceroll) {

  // PubSub.subscribe('Player:roll-result', (event) => {

    this.clearDots();

    const diceArray = this.numberToDice[diceroll];

  diceArray.forEach((dicePosition) => {
    const dotPosition = document.querySelector(`.dice-dot-${dicePosition}`);
    const dot = document.createElement('div');
    dot.classList.add('dice-button');
    dotPosition.appendChild(dot);
  })
};

DiceView.prototype.clearDots = function () {
  for (let i = 1; i < 10; i++) {
    const dotPosition = document.querySelector(`.dice-dot-${i}`);
    dotPosition.innerHTML='';
  }
};

module.exports = DiceView;
