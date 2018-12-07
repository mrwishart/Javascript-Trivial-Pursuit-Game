const Game = require('../models/game.js');
const assert = require('assert');

describe('Game', function () {
  let game;
  beforeEach(function () {
    game = new Game();
  })
  it('should have a current player', () => {
    const actual = game.currentPlayer;
    assert.strictEqual(actual, 1);
  })
  it('should be able to change current player', () => {
    game.passTurn();
    const actual = game.currentPlayer;
    assert.strictEqual(actual, 2);
  })
});
