const RollView = require('./views/roll_view.js');
const Dice = require("./models/dice.js");
const Game = require('./models/game.js');
const Player = require('./models/player.js');

document.addEventListener("DOMContentLoaded", () => {
  console.log("Javascript loaded");

  const rollView = new RollView();
  rollView.bindEvents();

  const dice = new Dice();
  dice.bindEvents();

  const player1 = new Player(1);
  const player2 = new Player(2);
  player1.bindEvents();
  player2.bindEvents();







  const game = new Game();
  game.bindEvents();


})
