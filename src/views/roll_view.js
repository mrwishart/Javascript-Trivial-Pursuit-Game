/*
Instance Variables:
- this.element

Methods:

bindEvents
  sub to Game:current-player - (receives: playerId)
  renders display
  waits for dice roll -> publishes 'RollView:dice-clicked' (sends: playerID)
end

render
  creates display (i.e some html/CSS stuf)
  shows which player is playing
  EXTENSION: Show what dice rolls
end
*/
