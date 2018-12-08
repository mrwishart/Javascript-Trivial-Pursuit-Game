const RequestHelper = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Question = function () {
  this.question;
  this.category;
  this.correctAnswer;
  this.answersArray;
  this.playerID;
  this.questionDifficulty = "medium";
}

Question.prototype.bindEvents = function () {

  PubSub.subscribe('Player:question-category', (event) => {
    const categoryObject = event.detail;
    const apiCode = categoryObject.apiCode;
    this.playerID = categoryObject.playerID;
    const url = `https://opentdb.com/api.php?amount=1&category=${apiCode}&difficulty=medium&type=multiple`
    console.log(url);
    const request = new RequestHelper(url);
    request.get()
      .then((data) => {this.addQuestionInfo(data.results[0])})
      .then(() => {return this.setUpQuestion();})
      .then((result) => {PubSub.publish("Question:question-ready", result);})
      .catch((error) => {console.error(error);})
  })

  PubSub.subscribe('QuestionView:question-answered', (event) => {
    const chosenAnswer = event.detail;
    const result = this.checkAnswer(chosenAnswer);

    if (result) {
      PubSub.publish(`QuestionP${this.playerID}:answer-correct`, this.category);
    }

    PubSub.publish('Question:question-result', result);
  })
};

Question.prototype.checkAnswer = function (chosenAnswer) {
  return chosenAnswer === this.correctAnswer;
};

Question.prototype.addQuestionInfo = function (apiInfo) {
  this.category = apiInfo.category;
  this.question = apiInfo.question;
  this.correctAnswer = apiInfo['correct_answer'];
  this.answersArray = apiInfo['incorrect_answers'];
  this.answersArray.push(this.correctAnswer);
  // Need to randomise answers
};

Question.prototype.setUpQuestion = function () {
  return {
    question: this.question,
    answers: this.answersArray
  };
};

Question.prototype.randomiseAnswers = function () {

};

module.exports = Question;

/*

{
"category": "History",
"type": "multiple",
"difficulty": "medium",
"question": "Which country had an &quot;Orange Revolution&quot; between 2004 and 2005?",
"correct_answer": "Ukraine",
"incorrect_answers": [
"Belarus",
"Latvia",
"Lithuania"
]
}

"https://opentdb.com/api.php?amount=1&category=23&difficulty=medium&type=multiple"

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
