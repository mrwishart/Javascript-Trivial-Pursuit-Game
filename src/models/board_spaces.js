// Convert subjects to an array of objects with key of topic and value of corresponding api code.

// [{category: 'history', apiCode: 23}, .....]

const BoardSpaces  = function () {
  this.entertainmentApis = [14, 10, 11, 12],
  this.subjects = [

    {category: "history",
      apiCode: 23},
    {category: "geography",
      apiCode: 22},
    {category: "sports",
      apiCode: 21},
    {category: "science",
      apiCode: 17},
    {category: "general-knowledge",
      apiCode: 9},
    {category: "entertainment",
      apiCode: this.entertainmentApis[Math.floor(Math.random() * 4)]},
                  ];

  this.boardSpaces = {
    0: subjects[0],
    1: subjects[1],
    2: subjects[2],
    3: subjects[3],
    4: subjects[4],
    5: subjects[5],
    6: subjects[0],
    7: subjects[1],
    8: subjects[2],
    9: subjects[3],
    10: subjects[4],
    11: subjects[5],
    12: subjects[0],
    13: subjects[1],
    14: subjects[2],
    15: subjects[3],
    16: subjects[4],
    17: subjects[5],
    18: subjects[0],
    19: subjects[1],
    20: subjects[2],
    21: subjects[3],
    22: subjects[4],
    23: subjects[5],
    24: subjects[0],
    25: subjects[1],
    26: subjects[2],
    27: subjects[3],
    28: subjects[4],
    29: subjects[5]
  }

}

// const entertainmentApis = [14, 10, 11, 12];
//
// const subjects = [
//
//   {category: "history",
//     apiCode: 23},
//   {category: "geography",
//     apiCode: 22},
//   {category: "sports",
//     apiCode: 21},
//   {category: "science",
//     apiCode: 17},
//   {category: "general-knowledge",
//     apiCode: 9},
//   {category: "entertainment",
//     apiCode: entertainmentApis[Math.floor(Math.random() * 4)]},
//                 ];
//
//
//
//
//
//
// const boardSpaces = {
//   0: subjects[0],
//   1: subjects[1],
//   2: subjects[2],
//   3: subjects[3],
//   4: subjects[4],
//   5: subjects[5],
//   6: subjects[0],
//   7: subjects[1],
//   8: subjects[2],
//   9: subjects[3],
//   10: subjects[4],
//   11: subjects[5],
//   12: subjects[0],
//   13: subjects[1],
//   14: subjects[2],
//   15: subjects[3],
//   16: subjects[4],
//   17: subjects[5],
//   18: subjects[0],
//   19: subjects[1],
//   20: subjects[2],
//   21: subjects[3],
//   22: subjects[4],
//   23: subjects[5],
//   24: subjects[0],
//   25: subjects[1],
//   26: subjects[2],
//   27: subjects[3],
//   28: subjects[4],
//   29: subjects[5]
// }

module.exports = BoardSpaces;
