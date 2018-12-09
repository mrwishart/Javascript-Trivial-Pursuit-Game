const PubSub = require('../helpers/pub_sub.js');
const PieceView = require('../views/piece_view.js');

const PlayerView = function (element) {
  this.element = element;
}

PlayerView.prototype.bindEvents = function () {
  for (var i = 1; i <= 4; i++) {
    PubSub.subscribe(`Player${i}:player-created`, (evt) => {
      this.render(evt.detail);
    });
  }
}

PlayerView.prototype.render = function (playerObj) {
  
};

module.exports = PlayerView;
