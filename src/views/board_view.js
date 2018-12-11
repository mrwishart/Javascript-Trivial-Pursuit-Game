const PubSub = require('../helpers/pub_sub.js');
const PieceView = require('../views/piece_view.js');
const Board = require('../models/board.js');

const BoardView = function (element) {
  this.element = element;
  this.oldPosition;
  this.newPosition;
  this.playerNumber = 0;
  this.direction;
};

BoardView.prototype.bindEvents = function () {
  PubSub.subscribe('Player:new-position', (evt) => {
    const playerId = evt.detail.playerID;
    const pie = evt.detail.pie;

    this.newPosition = evt.detail.position;
    this.oldPosition = evt.detail.oldPosition;
    this.direction = evt.detail.animHelper;

    if (this.oldPosition === undefined) {this.oldPosition = this.newPosition};

    this.render(playerId, this.oldPosition, pie);
  });

  PubSub.subscribe("BoardView:Animation-helper", (evt) => {
    const playerId = evt.detail.playerID;
    const pie = evt.detail.pie;
    this.render(playerId, this.oldPosition, pie);
  })
  this.colourInBoard();
  PubSub.subscribe('Player:new-player', (event) => {
    this.playerNumber += 1;
  })
};

BoardView.prototype.render = function (playerId, position, pie) {
  const oldPiece = document.querySelector(`#player-${playerId}-piece`);
  oldPiece.parentNode.removeChild(oldPiece);
  const htmlPosition = document.querySelector(`#box${position}`)

  const pieceView = new PieceView(playerId, htmlPosition, pie);
  pieceView.render();

  const board = new Board();
  const noOfSquares = Object.keys(board.boardSpaces).length;

  if (position !== this.newPosition) {
    this.oldPosition += this.direction;
    this.oldPosition %= 30;
    if (this.oldPosition < 0) {this.oldPosition += noOfSquares}

    window.setTimeout(function () {
      PubSub.publish("BoardView:Animation-helper", {
        playerID: playerId,
        position: this.oldPosition,
        pie: pie
      })
    }, 80);
  }
};

BoardView.prototype.colourInBoard = function () {
  // Render colour categories on the board.
  const board = new Board();
  for (let key in board.boardSpaces) {
    const space = document.querySelector(`#box${key}`);
    space.classList.add(`${board.boardSpaces[key].category}`)
  }
};

BoardView.prototype.setStartingPositions = function (numberOfPlayers) {
  // Render empty pieces on the starting square.
  const emptyPiece = {};
  const nearlyDonePiece = {'science': true, 'entertainment': true, 'geography': true}
  const startingPosition = document.querySelector('#box0');
  const startingPosition2 = document.querySelector('#box1');

  for (let i = 1; i <= numberOfPlayers; i++) {
    const piece = new PieceView(i, startingPosition, emptyPiece)
    piece.render();
  }

};

module.exports = BoardView;
