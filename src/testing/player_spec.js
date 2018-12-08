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
  it('should get correct category', () => {
    const actual = player.getCategoryObject().category;
    assert.strictEqual(actual, 'history');
  })
  it('should get category after a move', () => {
    player.move(3)
    const actual = player.getCategoryObject().category;
    assert.strictEqual(actual, 'science');
  })
  it('should get pie piece', () => {
    player.getPie('science')
    const expected = {'science': true};
    const actual = player.pie;
    assert.deepStrictEqual(actual, expected);
  })
  

});
