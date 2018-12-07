const Dice = require ('../models/dice.js');

const diceExample = new Dice();
const blank = {}

for (var i = 0; i < 1000; i++) {
  const diceRoll = diceExample.roll();
  if (!black[diceRoll])
  blank[diceExample.roll()] += 1;
}

console.log(blank);
