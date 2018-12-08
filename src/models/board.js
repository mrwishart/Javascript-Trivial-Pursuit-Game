

const Board  = function () {
  this.entertainmentApis = [14, 10, 11, 12];
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
    0: this.subjects[0],
    1: this.subjects[1],
    2: this.subjects[2],
    3: this.subjects[3],
    4: this.subjects[4],
    5: this.subjects[5],
    6: this.subjects[0],
    7: this.subjects[1],
    8: this.subjects[2],
    9: this.subjects[3],
    10: this.subjects[4],
    11: this.subjects[5],
    12: this.subjects[0],
    13: this.subjects[1],
    14: this.subjects[2],
    15: this.subjects[3],
    16: this.subjects[4],
    17: this.subjects[5],
    18: this.subjects[0],
    19: this.subjects[1],
    20: this.subjects[2],
    21: this.subjects[3],
    22: this.subjects[4],
    23: this.subjects[5],
    24: this.subjects[0],
    25: this.subjects[1],
    26: this.subjects[2],
    27: this.subjects[3],
    28: this.subjects[4],
    29: this.subjects[5]
  };

}

// const entertainmentApis = [14, 10, 11, 12];
//
// const this.subjects = [
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
//   0: this.subjects[0],
//   1: this.subjects[1],
//   2: this.subjects[2],
//   3: this.subjects[3],
//   4: this.subjects[4],
//   5: this.subjects[5],
//   6: this.subjects[0],
//   7: this.subjects[1],
//   8: this.subjects[2],
//   9: this.subjects[3],
//   10: this.subjects[4],
//   11: this.subjects[5],
//   12: this.subjects[0],
//   13: this.subjects[1],
//   14: this.subjects[2],
//   15: this.subjects[3],
//   16: this.subjects[4],
//   17: this.subjects[5],
//   18: this.subjects[0],
//   19: this.subjects[1],
//   20: this.subjects[2],
//   21: this.subjects[3],
//   22: this.subjects[4],
//   23: this.subjects[5],
//   24: this.subjects[0],
//   25: this.subjects[1],
//   26: this.subjects[2],
//   27: this.subjects[3],
//   28: this.subjects[4],
//   29: this.subjects[5]
// }

module.exports = Board;
