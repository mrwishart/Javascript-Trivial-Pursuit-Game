const Board = require('./board.js');
const PubSub = require('../helpers/pub_sub.js')

const Player = function (playerID) {
  this.playerID = playerID;
  this.position = 0;
  this.pie = {};
  this.name;
}

Player.prototype.bindEvents = function () {
  PubSub.subscribe(`DiceP${this.playerID}:roll-result`, (event) => {
    const diceroll = event.detail;
    PubSub.publish('Player:roll-result', diceroll);
    this.move(diceroll);
    const categoryObject = this.getCategoryObject();
    categoryObject['playerID'] = this.playerID;
    PubSub.publish('Player:question-category', categoryObject);
  })

  PubSub.subscribe(`QuestionP${this.playerID}:answer-correct`, (event) => {
    const category = event.detail;
    this.getPie(category);
  })
<<<<<<< HEAD
  PubSub.subscribe(`IntroForm:player${this.playerID}-details-entered`, (event) => {
    this.name = event.detail;
    console.log(this.name);
  })
=======
  PubSub.publish(`Player${this.playerID}:player-created`, {
    playerID: this.playerID,
    pie: this.pie
  });
>>>>>>> develop
};

Player.prototype.move = function (diceroll) {
  const board = new Board();
  const noOfSquares = Object.keys(board.boardSpaces).length;
  const oldPosition = this.position;
  this.position = (this.position + diceroll) % noOfSquares;

  PubSub.publish('Player:new-position', {
    playerID: this.playerID,
    oldPosition: oldPosition,
    position: this.position,
    pie: this.pie
  });
};

Player.prototype.getCategoryObject = function () {
  const board = new Board();

  return board.boardSpaces[this.position];
};

Player.prototype.getPie = function (category) {
  this.pie[category] = true;
  PubSub.publish('Player:new-position', {
    playerID: this.playerID,
    position: this.position,
    pie: this.pie
  });

  if (this.checkWin()) {
    PubSub.publish('Player:win-detected', this.playerID);
  };
};

Player.prototype.checkWin = function () {
  return Object.keys(this.pie).length >= 4;
};

module.exports = Player;

/*
requires boardSpaces

Instance Variables:

position - Integer
playerID - Integer
pie - { categoryname: boolean } (initialise as false)

Methods:


bindEvents

Subs to DiceP${ID}:roll-result (dynamically created by playedID)
move(diceroll)
get-category(position)
Pubs 'Player:question-category' (sends playerID, categoryObject)
end

Sub to QuestionP${ID}:answer-correct
getPie
end

end


move(diceroll)
add dice roll to position
logic for rapping, yo
Pubs Player:new-position (sends playedID, pie, new position)
end


getCategory(position)
queries boardspaces[position]
returns categoryObject
end

getPie(category name)
adds slice to player via category name
checks to see if player has won - checkWin()
end

checkWin()
counts slices of pie, returns true if >= 4
end

*/
