const RequestHelper = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Question = function () {
  this.question;
  this.category;
  this.correctAnswer;
  this.answersArray;
  this.playerID;
  this.questionDifficulty = "medium";
  this.token;
};

Question.prototype.bindEvents = function () {

  this.getTokenFromAPI();

  PubSub.subscribe('Player:question-category', (event) => {
    const categoryObject = event.detail;
    const apiCode = categoryObject.apiCode;
    this.playerID = categoryObject.playerID;
    this.category = categoryObject.category;
    const url = `https://opentdb.com/api.php?amount=1&category=${apiCode}&difficulty=medium&type=multiple&token=${this.token}`
    console.log(url);
    const request = new RequestHelper(url);
    request.get()
      .then((data) => {this.addQuestionInfo(data.results[0])})
      .then(() => {return this.setUpQuestion();})
      .then((result) => {PubSub.publish("Question:question-ready", result);})
      .catch((error) => {console.error(error);})
  });

  PubSub.subscribe('QuestionView:question-answered', (event) => {
    const chosenAnswer = event.detail;
    console.log('chosen answer:', chosenAnswer);
    const result = this.checkAnswer(chosenAnswer);
    const resultObject = {
      answer: this.correctAnswer,
      answerCorrect: result
    };
    if (result) {
      PubSub.publish(`QuestionP${this.playerID}:answer-correct`, this.category);
    }
    PubSub.publish('Question:question-result', resultObject);
  })
};

Question.prototype.getTokenFromAPI = function () {
  const url = "https://opentdb.com/api_token.php?command=request";
  const request = new RequestHelper(url);
  request.get()
  .then((result) => {this.token = result.token;})
};

Question.prototype.checkAnswer = function (chosenAnswer) {
  return chosenAnswer === this.correctAnswer;
};

Question.prototype.addQuestionInfo = function (apiInfo) {
  this.question = apiInfo.question;
  this.correctAnswer = apiInfo['correct_answer'];
  this.answersArray = apiInfo['incorrect_answers'];
  this.answersArray.push(this.correctAnswer);
  this.answersArray = this.randomiseAnswers(this.answersArray);
};

Question.prototype.setUpQuestion = function () {
  return {
    question: this.question,
    answers: this.answersArray
  };
};


Question.prototype.randomiseAnswers = function (array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

module.exports = Question;
