re

/*

require: RequestHelper

Instance Variables:

**** ALL EMPTY ON INITIALISATION. Filled through methods.

question - String
category - String
incorrectAnswers - [Strings] (length: 3)
correctAnswer - String
playerID


Methods:

bindEvents

  Subs to Player:question-category (playerID, categoryObject)
    Get question from API, using category.apiCode
    .then randomiseAnswers
    .then publishes Question:question-ready
    .catch
  end

  Subs to QuestionView:question-answered (chosen answer)

    if checkAnswer(chosen answer):
      Pub QuestionP${ID}:answer-correct (sends categoryname)
    end

    Pub QuestionP${ID}:question-result

  end

end

checkAnswer(chosenAnswer)
  returns whether chosen answer = actual answer
end

randomiseAnswers
  array []
  this.answers = randomised answers
end

*/
