const Player = require('../models/player.js');
const assert = require('assert');

describe('Player', function () {
  let player;
  beforeEach(function () {
    player = new Player();
  })
  it('should allow move', () => {
    player.move(3)
    const actual = player.position;
    assert.strictEqual(actual, 3);
  })
  it('should allow move/wrap', () => {
    player.move(30)
    const actual = player.position;
    assert.strictEqual(actual, 0);
  })


});
