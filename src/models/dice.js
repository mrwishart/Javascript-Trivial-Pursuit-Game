const PubSub = require('../helpers/pub_sub.js')

const Dice = function () {
}

Dice.prototype.bindEvents = function () {
  PubSub.subscribe('RollView:dice-clicked', (event) => {
    const playerId = event.detail;
    const diceRoll = this.roll()
    PubSub.publish(`DiceP${playerId}:roll-result`, diceRoll)
  })
};

Dice.prototype.roll = function () {
  return Math.ceil(Math.random() * 6)
};

module.exports = Dice;
