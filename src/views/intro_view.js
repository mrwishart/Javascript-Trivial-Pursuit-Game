const PubSub = require('../helpers/pub_sub.js')

const IntroView = function (parentElement) {
  this.parentElement = parentElement;
}


IntroView.prototype.bindEvents = function () {
  this.createIntroForm();
};


module.exports = IntroView;
