const PubSub = require('../helpers/pub_sub.js');
const PieceView = require('../views/piece_view.js');

const PlayerView = function (element) {
  this.element = element;
}

PlayerView.prototype.bindEvents = function () {
  for (let i = 1; i <= 2; i++) {
    PubSub.subscribe(`Player${i}:player-created`, (evt) => {
      this.render(evt.detail);
    });
  }
}

PlayerView.prototype.render = function (playerObj) {
  const playerID = playerObj.playerID;
  const playerPie = playerObj.pie;

  const playerDiv = document.createElement('div');
  playerDiv.classList.add('player-container');
  this.element.appendChild(playerDiv);

  const pieceInfoDiv = document.createElement('div');
  pieceInfoDiv.classList.add('piece-info-div')
  playerDiv.appendChild(pieceInfoDiv);
  const fakePie = {'history':true}; // Just for testing.
  const piece = new PieceView(playerID, pieceInfoDiv, playerPie)
  piece.render();


  const playerInfoDiv = document.createElement('div');
  playerInfoDiv.classList.add('player-info-div');
  playerDiv.appendChild(playerInfoDiv)
  const playerNamePara = document.createElement('p');
  playerNamePara.textContent = `Player ${playerID}`;
  playerInfoDiv.appendChild(playerNamePara);
};

module.exports = PlayerView;
