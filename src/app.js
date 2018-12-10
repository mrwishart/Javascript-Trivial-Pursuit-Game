const RollView = require('./views/roll_view.js');
const Dice = require("./models/dice.js");
const Game = require('./models/game.js');
const Player = require('./models/player.js');
const BoardView = require('./views/board_view.js');
const Question = require('./models/question.js');
const QuestionView = require('./views/question_view.js');
const WinView = require('./views/win_view.js');
const PlayerView = require('./views/player_view.js');

document.addEventListener("DOMContentLoaded", () => {
  console.log("Javascript loaded");

  const rollContainer = document.querySelector('#roll-view');
  const rollView = new RollView(rollContainer);
  rollView.bindEvents();

  const dice = new Dice();
  dice.bindEvents();

  const playerViewElement = document.querySelector('#player-view');
  const playerView = new PlayerView(playerViewElement);
  playerView.bindEvents();

  const player1 = new Player(1);
  const player2 = new Player(2);
  player1.bindEvents();
  player2.bindEvents();

  const question = new Question();
  question.bindEvents();

  const boardElement = document.querySelector('.board-container');
  const boardView = new BoardView(boardElement);
  boardView.bindEvents();
  boardView.setupStartPositions();

  const parentElement = document.querySelector('#question-view')
  const questionView = new QuestionView(parentElement);
  questionView.bindEvents();

  const winView = new WinView(boardElement);
  winView.bindEvents();



  const game = new Game();
  game.bindEvents();


})
