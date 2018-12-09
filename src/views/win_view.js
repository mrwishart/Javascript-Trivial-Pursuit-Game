const PubSub = require('../helpers/pub_sub.js')

const WinView = function (parentElement) {
  this.parentElement = parentElement;
}


WinView.prototype.bindEvents = function () {
  PubSub.subscribe('Player:win-detected', (evt) => {
    const winnerID = evt.detail;
    this.render(winnerID);
  })
};

WinView.prototype.render = function (winnerID) {
  const winViewElement = document.createElement('div');
  winViewElement.id = 'win-view';
  this.parentElement.appendChild(winViewElement);

  const congrat = document.createElement('h1');
  congrat.textContent = `Congratulations Player ${winnerID}, you've won!`;
  winViewElement.appendChild(congrat);
  console.dir(congrat);

  const restartForm = document.createElement('form');
  winViewElement.appendChild(restartForm);
  const restartSubmit = document.createElement('input');
  restartSubmit.setAttribute('type', 'submit');
  restartSubmit.setAttribute('value', 'RESTART');
  restartForm.appendChild(restartSubmit);

};


module.exports = WinView;
