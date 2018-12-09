const PubSub = require('../helpers/pub_sub.js');
const PieceView = require('../views/piece_view.js');
const Board = require('../models/board.js');

const BoardView = function (element) {
  this.element = element;
}

BoardView.prototype.bindEvents = function () {
  PubSub.subscribe('Player:new-position', (evt) => {
    const playerId = evt.detail.playerID;
    const position = evt.detail.position;
    const pie = evt.detail.pie;
    this.render(playerId, position, pie);
  });
};

BoardView.prototype.render = function (playerId, position, pie) {
  const oldPiece = document.querySelector(`#player-${playerId}-piece`);
  oldPiece.parentNode.removeChild(oldPiece);
  const htmlPosition = document.querySelector(`#box${position}`)

  const pieceView = new PieceView(playerId, htmlPosition, pie);
  pieceView.render();
};

BoardView.prototype.setupStartPositions = function () {
  // Render colour categories on the board.
  const board = new Board();
  for (let key in board.boardSpaces) {
    const space = document.querySelector(`#box${key}`);
    space.classList.add(`${board.boardSpaces[key].category}`)
  }


  // Render empty pieces on the starting square.
  const emptyPiece = {};
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
