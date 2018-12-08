const boardSpaces = require('./board_spaces.js');
const PubSub = require('../helpers/pub_sub.js')

const Player = function (playerID) {
  this.playerID = playerID;
  this.position = 0;
  this.pie = {
    "history": false,
    "geography": false,
    "sports": false,
    "science": false,
    "general-knowledge": false,
    "entertainment": false
  };
}

Player.prototype.bindEvents = function () {
  PubSub.subscribe(`DiceP${this.playerID}:roll-result`, (event) => {
    const diceroll = event.detail;
    PubSub.publish('Player:roll-result', diceroll);
    move(diceroll);
    const categoryObject = getCategoryObject();
    PubSub.publish('Player:question-category', categoryObject);
  })

  PubSub.subscribe(`QuestionP${this.playerID}:answer-correct`, () => {
    this.getPie();
  })
};

Player.prototype.move = function (diceroll) {
  const noOfSquares = boardSpaces.keys().length;
  this.position = (this.position + diceroll) % noOfSquares;

  PubSub.publish('Player:new-position', {
    playerID: this.playerID,
    position: this.position,
    pie: this.pie
  });
};

Player.prototype.getCategoryObject = function () {

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
