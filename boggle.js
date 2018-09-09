"use strict"

var templateBoard = [
[ 'E', 'A', 'B', 'E' ],
[ 'A', 'G', 'L', 'R' ],
[ 'B', 'E', 'T', 'F' ],
[ 'E', 'W', 'P', 'Q' ] ];

var templateWords = ['EAGLE', 'LET', 'WET', 'BEE', 'WEB', 'AGE', 'BEAGLE', 'BELT', 'OTHERSTUFF', 'TEST', 'CANCEL', 'NOT', 'INTHE', 'BOARD', 'BET', 'GET'];

class Boggle {
  constructor(words) {
    this.word = templateWords;
    this.board = templateBoard;
    this.findMatch = this.findTheWords(this.word);
  }

  // NOTE: shake function for boogle 1 task
  // shake(num) {
  //     let alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  //     let arrayBoggle = [];
  //     let arrWord = [];
  //     for (var i = 1; i <= (num*num); i++) {
  //       let random = Math.floor(Math.random() * alpha.length);
  //       if (i % num === 0) {
  //         arrWord.push(alpha[random]);
  //         arrayBoggle.push(arrWord);
  //         arrWord = [];
  //       } else {
  //         arrWord.push(alpha[random]);
  //       }
  //     }
  //     return arrayBoggle;
  // } //end shake function

  showBoard() {
      console.log('Boggle board!');
      let boardLagi = this.board.map(a => '  '+ a ).join('\n+---+----+----+----+\n').replace(/,/g, '  |  ');
      console.log('\n+---+----+----+----+\n' + boardLagi + '\n+---+----+----+----+\n');
  }

  findTheWords(data) {
    let matchWord = [];
    for (let i in data) {
      let matchObj = {};
      matchObj.word = data[i];
      let index = [];

      for (var j = 0; j < data[i].length; j++) {
        let temp = this.findChar(data[i][j]);
        if (temp[0] !== undefined) {
          index.push(temp);
        } else {
          j = data[i].length;
        }
      }

      let combination = [];
      if (index.length === data[i].length) {
        this.findCombination([], combination, index);
        matchObj.indexCombination = combination;
        if (combination.length !== 0) {
          matchWord.push(matchObj);
        }
      }
    }
    return matchWord;
  } // end findTheWords

  findChar(char) {
    let temp = [];
    let board = this.board;
    for(let k = 0; k < board.length; k++) {
        for(let l = 0; l < board[k].length; l++) {
            if(board[k][l] === char) {
                temp.push([k,l]);
            }
        }
    }
    return temp;
  }

  checkDuplicate(data) {
    if (data.length < 1) {
      return false;
    }
    for (var i = 1; i < data.length; i++) {
      if (data[0][0] === data[i][0] && data[0][1] === data[i][1]) {
        return true;
      }
      let sisa = data.slice(1);
      return this.checkDuplicate(sisa);
    }
  }

  findCombination(arr, res, data) {
    if (data.length < 1) {
      if (!this.checkDuplicate(arr)) {
        res.push(arr);
      }
    } else if (data[0].length === 1) {
      arr.push(data[0][0]);
      this.findCombination(arr, res, data.slice(1));
    } else if (data[0].length > 1) {
      for (var i = 0; i < data[0].length; i++) {
        let tempArr = arr.slice();
        tempArr.push(data[0][i]);
        this.findCombination(tempArr, res, data.slice(1));
      }
    }
  }

  solved() {
    console.log(`${this.findMatch.length} words found!\n`);
    let result = [];
    for (let i in this.findMatch) {
      result.push(this.findMatch[i].word);
    }
    let sorted = result.sort();
    console.log(sorted.map(a =>  a ).join(' ').replace(/ /g, '  ->  '));
  }

} // end class boggle

var game = new Boggle()

game.showBoard();
game.solved();


/* Boogle 2 - Release 0
make up a template boards and template words
create class boogle

create showBoard function to show the template board

create findTheWords function with all the words from templateWords as parameter
  create new match array
  loop every i in templateWords
    create new match object
    create new key word
    later on get array of index where you gather from  findChar function and by looping all the data inside findchar and push it to array of index
    for every char in templateBoard, loop to get the character
    after looping every char, check te combination in separate function and push it to match array

create findChar function
  loop the board 2 times and if it equals to the character inside templateWords push it to a temp array of indexes

check duplicate
   check the combination in arr to find the same char and returns true

create combination function
  with the index in findTheWords if it.lengt than one, push the index in tempArr and keep calling the function with slice(1) until length less than 1 and then push it to the combination array in findTheWords

create solved function to show all matched words in the template
  log the word in the every index in findTheWords function
*/
