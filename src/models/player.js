const Board = require('./board.js');
const PubSub = require('../helpers/pub_sub.js')

const Player = function (playerID, name) {
  this.playerID = playerID;
  this.position = 0;
  this.pie = {};
  this.name = name;
};

Player.prototype.bindEvents = function () {
  PubSub.subscribe(`DiceP${this.playerID}:roll-result`, (event) => {
    const diceroll = event.detail;
    const positionObject = {
      diceroll: diceroll,
      position: this.position,
      playerID: this.playerID
    };
    PubSub.publish('Player:roll-result', positionObject);
    // Need to insert new view -> let user chose which direction they want to go
  });

  PubSub.subscribe(`MoveViewP${this.playerID}:RoutePicked`, (evt) => {
    const diceroll = event.detail;

    this.move(diceroll);
    const categoryObject = this.getCategoryObject();
    categoryObject['playerID'] = this.playerID;
    PubSub.publish('Player:question-category', categoryObject);
  });
  PubSub.subscribe(`QuestionP${this.playerID}:answer-correct`, (event) => {
    const category = event.detail;
    this.getPie(category);
  })

  PubSub.publish(`Player${this.playerID}:player-created`, {
    name: this.name,
    playerID: this.playerID,
    pie: this.pie
  });
  PubSub.publish(`Player:new-player`, true);
};

Player.prototype.move = function (diceroll) {
  const board = new Board();
  const noOfSquares = Object.keys(board.boardSpaces).length;
  const oldPosition = this.position;
  this.position = (this.position + diceroll) % noOfSquares;
  if (this.position < 0) {this.position += noOfSquares}

  console.log(this.position);

  PubSub.publish('Player:new-position', {
    playerID: this.playerID,
    oldPosition: oldPosition,
    position: this.position,
    pie: this.pie,
    animHelper: diceroll/Math.abs(diceroll)
  });
};

Player.prototype.getCategoryObject = function () {
  const board = new Board();
  return board.boardSpaces[this.position];
};

Player.prototype.getPie = function (category) {
  this.pie[category] = true;
  PubSub.publish('Player:new-position', {
    playerID: this.playerID,
    position: this.position,
    pie: this.pie
  });
  if (this.checkWin()) {
    const playerObject = {
      id: this.playerID,
      name: this.name
    };
    PubSub.publish('Player:win-detected', playerObject);
  };
};

Player.prototype.checkWin = function () {
  return Object.keys(this.pie).length >= 4;
};

module.exports = Player;
