const PubSub = require('../helpers/pub_sub.js');

const QuestionView = function (element) {
  this.element = element;
}

QuestionView.prototype.bindEvents = function () {
  PubSub.subscribe("Question:question-ready", (event) => {
    const questionInfo = event.detail;
    this.render(questionInfo);
  })
  PubSub.subscribe('Question:question-result', (event) => {
    const questionResult = event.detail;
    this.displayResult(questionResult)
  })
};

QuestionView.prototype.render = function (info) {
  const question = document.createElement('p')
  question.innerHTML = info.question;
  this.element.appendChild(question)
  this.displayAnswers(info.answers)
};

QuestionView.prototype.displayAnswers = function (answers) {
  const answerList = document.createElement('select');
  const intro = document.createElement('option')
  intro.disabled = true;
  intro.textContent = "Pick Answer"
  answerList.appendChild(intro)
  answers.forEach((answer) => {
    const option = document.createElement('option')
    option.id = answer;
    option.innerHTML = answer
    answerList.appendChild(option)
  })
  this.element.appendChild(answerList)
};


module.exports = QuestionView;



/*

this.HTMLelement

bindEvents
Sub - Question:question-ready, question + [answers ]
          - render(question + [answers] )

      Question:question-result, boolean + correctAnswer;
          - displayResult(boolean + correctAnswer)

addEventListener( change , this.HTMLelement)
  - PUB - QuestionView:question-answered,  chosenAnswer
end


potential problem - making sure question string stays the same.


render(question + [answers])


displayResult(correctAnswer)
  -colour display, or do a string to let player know if it's right.

*/
