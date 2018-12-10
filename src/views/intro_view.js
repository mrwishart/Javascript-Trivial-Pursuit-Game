const PubSub = require('../helpers/pub_sub.js')

const IntroView = function (parentElement) {
  this.parentElement = parentElement;
  this.player1 = null;
  this.player2 = null;
}


IntroView.prototype.bindEvents = function () {
  this.createIntroForm();
};

IntroView.prototype.createIntroForm = function () {
  const introViewElement = document.createElement('div');
  introViewElement.id = 'win-view';
  this.parentElement.appendChild(introViewElement)
};



module.exports = IntroView;
