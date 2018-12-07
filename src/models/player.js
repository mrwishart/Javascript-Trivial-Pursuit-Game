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
