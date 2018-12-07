const PubSub = require('../helpers/pub_sub.js')
const Dice = require ('../models/dice.js');

const diceExample = new Dice();
const blank = {}

for (var i = 0; i < 100000; i++) {
  const diceRoll = diceExample.roll();
  if (!blank[diceRoll]) {
    blank[diceRoll] = 1;
  } else {
  blank[diceExample.roll()] += 1;
 }
}



// console.log(blank);
