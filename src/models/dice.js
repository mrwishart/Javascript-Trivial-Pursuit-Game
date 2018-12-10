const PubSub = require('../helpers/pub_sub.js')


const Dice = function () {

}

Dice.prototype.bindEvents = function () {
  PubSub.subscribe('RollView:dice-clicked', (event) => {
    const playerId = event.detail;
    const diceRoll = this.roll()
    PubSub.publish(`DiceP${playerId}:roll-result`, diceRoll)
    PubSub.publish('Dice:Rolled', diceRoll);
  })

};

Dice.prototype.roll = function () {
  return Math.ceil(Math.random() * 6)
};




// sub to RollView:dice-clicked - payload detail includes player id
// roll()
// publish dice on player specific channel - 'DiceP{dynamicnumber}:roll-result:'



// proto roll()
// return random number between 1 and 6
module.exports = Dice;
