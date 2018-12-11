const PieceView = function (playerId, htmlPosition, pie) {
  this.playerId = playerId;
  this.parentElement = htmlPosition;
  this.pie = pie;
};

PieceView.prototype.render = function () {
  const piece = document.createElement('div');
  piece.id = `player-${this.playerId}-piece`;
  this.parentElement.appendChild(piece);

  const categoryClass = {
    "history": 'brown-pie',
    "geography": 'blue-pie',
    "sports": 'orange-pie',
    "entertainment": 'yellow-pie',
    "science": 'green-pie',
    "general-knowledge": 'purple-pie'
  };
  const achievedPies = Object.keys(this.pie);

  for (let i = 1; i <= achievedPies.length; i++) {
    const slot = document.createElement('div');
    slot.classList.add(`slot-${i}`, `${categoryClass[achievedPies[i-1]]}`);
    piece.appendChild(slot);
  }

  for (let i = achievedPies.length +1 ; i < 5; i++) {
    const slot = document.createElement('div');
    slot.classList.add(`slot-${i}`, `empty-slot`);
    piece.appendChild(slot);
  }
};

module.exports = PieceView;
