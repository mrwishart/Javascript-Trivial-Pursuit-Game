/*
this.currentPlayer

bindEvents = Sub to Question, question result - boolean and correct answer
passTurn if boolean false, Pub to Game:player-ready.

At start of game, this should Pub to Game:player-ready with player1 as default.


passTurn - switches current player to the next.
Something like...
{1: 2,
2: 1}

*/
const PubSub = require('../helpers/pub_sub.js');

const Game = function () {
  this.currentPlayer = 1;
};

Game.prototype.bindEvents = function () {
  PubSub.subscribe('Question:question-result', (evt) => {
    const answerCorrect = evt.detail.answerCorrect;
    if (answerCorrect) {this.passTurn()};
  });
  PubSub.publish('Player:player-ready', this.currentPlayer);
};

Game.prototype.passTurn = function () {
  const turnOrder = {1: 2, 2: 1};
  this.currentPlayer = turnOrder[this.currentPlayer];
};

module.exports = Game;
