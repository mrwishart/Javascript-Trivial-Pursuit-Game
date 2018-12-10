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
const Player = require('./player.js');
const PubSub = require('../helpers/pub_sub.js');

const Game = function (boardView, playerView) {
  this.currentPlayer = 1;
  this.board = boardView;
  this.playerView = playerView;
};

Game.prototype.bindEvents = function () {
  PubSub.subscribe('IntroForm:player-details-entered', (event) => {
    this.playerView.bindEvents();
    const playerObject = event.detail;
    for (playerID in playerObject){
      const newPlayer = new Player(playerID, playerObject[playerID]);
      newPlayer.bindEvents();
    }
    this.board.setStartingPositions();
  })

  PubSub.subscribe('Question:question-result', (evt) => {
    const answerCorrect = evt.detail.answerCorrect;
    // console.log(answerCorrect);
    if (!answerCorrect) {this.passTurn()};
    this.nextMove();
  });
  this.nextMove();
};

Game.prototype.passTurn = function () {
  const turnOrder = {1: 2, 2: 1};
  this.currentPlayer = turnOrder[this.currentPlayer];
};

Game.prototype.nextMove = function () {
  PubSub.publish('Game:current-player', this.currentPlayer);
};

module.exports = Game;
