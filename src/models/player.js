const BoardSpaces = require('./board_spaces.js');
const PubSub = require('../helpers/pub_sub.js');

const Player = function (playerID) {
  this.playerID = playerID;
  this.position = 0;
  this.pie = {};
}

Player.prototype.bindEvents = function () {
  PubSub.subscribe(`DiceP${this.playerID}:roll-result`, (event) => {
    const diceroll = event.detail;
    PubSub.publish('Player:roll-result', diceroll);
    this.move(diceroll);
    const categoryObject = this.getCategoryObject();
    console.log(categoryObject);
    categoryObject['playerID'] = this.playerID;
    PubSub.publish('Player:question-category', categoryObject);
  })

  PubSub.subscribe(`QuestionP${this.playerID}:answer-correct`, (event) => {
    const category = event.detail;
    this.getPie(category);
  })
};

Player.prototype.move = function (diceroll) {
  const boardSpaces = new BoardSpaces();
  // const noOfSquares = boardSpaces['boardSpaces'].keys().length;
  this.position = (this.position + diceroll) % 30;

  PubSub.publish('Player:new-position', {
    playerID: this.playerID,
    position: this.position,
    pie: this.pie
  });
};

Player.prototype.getCategoryObject = function () {
  const boardSpaces = new BoardSpaces();

  return boardSpaces[this.position];
};

Player.prototype.getPie = function (category) {
  this.pie[category] = true;
  if (checkWin()) {/* do some win state stuff*/};
};

Player.prototype.checkWin = function () {
  return this.pie.keys() >= 4;
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
