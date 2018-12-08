const PubSub = require('../helpers/pub_sub.js');
const PieceView = require('../views/piece_view.js');

const BoardView = function (element) {
  this.element = element;
}

BoardView.prototype.bindEvents = function () {
  PubSub.subscribe('Player:new-position', (evt) => {
    const playerId = evt.detail.playerID;
    const position = evt.detail.position;
    const pie = this.pie;

    this.element.innerHTML = '';
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


//start positions
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
