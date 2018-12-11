const PubSub = require('../helpers/pub_sub.js');
const PieceView = require('../views/piece_view.js');
const Board = require('../models/board.js');

const BoardView = function (element) {
  this.element = element;
  this.oldPosition;
  this.newPosition;
  this.playerNumber = 0;
}

BoardView.prototype.bindEvents = function () {
  PubSub.subscribe('Player:new-position', (evt) => {
    const playerId = evt.detail.playerID;
    const pie = evt.detail.pie;

    this.newPosition = evt.detail.position;
    this.oldPosition = evt.detail.oldPosition;

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
  if (position !== this.newPosition) {
    this.oldPosition++;
    this.oldPosition %= 30;
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
  const pieceOne = new PieceView(1, startingPosition, emptyPiece);
  const pieceTwo = new PieceView(2, startingPosition, emptyPiece);
  pieceOne.render();
  pieceTwo.render();
};

module.exports = BoardView;

/*
require pieceView

this.element = HTMLelement,

bindEvents
setupStartPositions()

SUB Player:new-position, (playerID, pie, newPosition)
-remove old div
-render(playerID, pie, newPosition)

end

render(playerID, pie, newPosition)
create new pieceView object (playerID, pie)
new pieceView.render (pieceView's render function)
append to newPosition

end

setupStartPositions()
const emptyPiece = {categoryName: false,  ......}
render(1, emptyPiece, 0)
render(2, emptyPiece, 0)
end
*/
