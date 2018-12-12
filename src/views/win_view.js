const PubSub = require('../helpers/pub_sub.js')

const WinView = function (parentElement) {
  this.parentElement = parentElement;
};

WinView.prototype.bindEvents = function () {
  PubSub.subscribe('Player:win-detected', (evt) => {
    const winnerObj = evt.detail;
    this.render(winnerObj);
  })
};

WinView.prototype.render = function (winnerObj) {

  const winViewElement = document.createElement('div');
  winViewElement.id = 'win-view';

  this.parentElement.appendChild(winViewElement);

  const congrat = document.createElement('h1');
  congrat.textContent = `Congratulations ${winnerObj.name}, you've won!`;
  congrat.classList.add('win-state');
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
