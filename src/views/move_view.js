const PubSub = require('../helpers/pub_sub.js');
const Board = require('../models/board.js');

const MoveView = function () {
 this.boardInfo = new Board();
 this.noOfSquares = Object.keys(this.boardInfo.boardSpaces).length;
 this.forwardSquare;
 this.backwardSquare;
 this.cover;
 this.diceroll;
 this.playerID;
 this.firstKey;
 this.secondKey;
}

MoveView.prototype.bindEvents = function () {

  PubSub.subscribe('Player:roll-result', (evt) => {
    this.diceroll = evt.detail.diceroll;
    this.playerID = evt.detail.playerID;
    console.log("Hello");
    console.log(this.playerID);
    const rollForwards = (evt.detail.position + evt.detail.diceroll) % this.noOfSquares;
    let rollBackwards = evt.detail.position - evt.detail.diceroll;
    if (rollBackwards < 0) {rollBackwards += this.noOfSquares};

    this.forwardSquare = document.getElementById(`box${rollForwards}`);
    // forwardSquare.style.zIndex = "100";
    console.log(this.forwardSquare.classList[1]);
    this.forwardSquare.classList.add("pulsating-box");
    this.backwardSquare = document.getElementById(`box${rollBackwards}`);
    // backwardSquare.style.zIndex = "100";
    this.backwardSquare.classList.add("pulsating-box");
    // const rollView = document.getElementById('display-view');
    // rollView.style.zIndex = "100";
    const categoryOne = this.forwardSquare.classList[1];
    const categoryTwo = this.backwardSquare.classList[1];

    this.firstKey = document.querySelector(`.${categoryOne}-key`);
    this.secondKey = document.querySelector(`.${categoryTwo}-key`);

    this.firstKey.classList.add("static-box");
    this.secondKey.classList.add("static-box");

    const docBody = document.querySelector('html')
    this.cover = document.createElement('div');
    this.cover.id = "move-view-cover";
    docBody.appendChild(this.cover);

  })

  document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains("pulsating-box")) {
      this.forwardSquare.classList.remove("pulsating-box");
      this.backwardSquare.classList.remove("pulsating-box");
      this.firstKey.classList.remove("static-box");
      this.secondKey.classList.remove("static-box");
      this.cover.parentNode.removeChild(this.cover);

      if (evt.target === this.backwardSquare) {this.diceroll *= -1};
      PubSub.publish(`MoveViewP${this.playerID}:RoutePicked`, this.diceroll);
    }
  })
};

module.exports = MoveView;
