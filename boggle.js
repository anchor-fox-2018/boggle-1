"use strict"

class Boggle {
  constructor(board_string) {
    this.string = board_string;
    this.game = this.shake();
  }

  shake(num) {
    let alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let arrayBoggle = [];
    let arrWord = [];
    for (var i = 1; i <= (num*num); i++) {
      let random = Math.floor(Math.random() * alpha.length)
      if (i % num === 0) {
        arrWord.push(alpha[random]);
        arrayBoggle.push(arrWord);
        arrWord = [];
      } else {
        arrWord.push(alpha[random]);
      }
    }
    return arrayBoggle;
  } //end shake function

} // end class boggle

var fs = require('fs')
var board_string = fs.readFileSync('data.js')
  .toString()
  .split("\n")[0]

var game = new Boggle(board_string)

console.log(game.shake(4));
