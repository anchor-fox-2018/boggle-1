/*
PSEUDOCODE

1. make the board using for loop and Math.random() (line 11 - 35)
2. add the words as a string, along with each coordinates in an array (so, nested array) (line 47 - 57)
3. first filter: length less than 4 or more than max from board (line 63 - 70)
4. second filter: for each letter, if it doesn't appear on the words string, remove it (line 77 - 90)
5. third filter: for each letter, if the letter count is more than what appears on words string, remove it (line 97 - 111)
6. fourth filter: for each letter, map the coordinates from words string and check if from first to second, the coordinates doesn't move more than 1 to left, right, bottom, top (in combination of X-Y), if true, put boolean true on it. if the amount of true is equal to length of string, add to result (118 - 155)
7. display result (line 158)
*/


// importing words
let words = require('./data.js').dataWords;


//shake
function shake(input) {
    let result = [];
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    // each column
    for (let i = 0; i < input; i++) {
        let semiResult = [];

        // each row
        for (let c = 0; c < input; c++) {
            let fate = Math.floor(Math.random() * 26);
            semiResult.push(alphabet[fate]);
        }
        result.push(semiResult);
    }

    console.log(result);
    return result;
}

let shakeResult = shake(4);


//count function
String.prototype.count = function (s1) {
    return (this.length - this.replace(new RegExp(s1, "g"), '').length) / s1.length;
}

///////////////////////////////////////////////////////
// turning shakeResult to string with its coordinate //
///////////////////////////////////////////////////////

let shakeString = '';
let coord = [];

//col
for (let i = 0; i < shakeResult.length; i++) {
    //row
    for (let c = 0; c < shakeResult[i].length; c++) {
        shakeString += shakeResult[i][c];
        coord.push([i, c]); //[col, row]
    }
}

//////////////
// filter 1 //
//////////////

let filteredOnce = [];
for (let i = 0; i < words.length; i++) {
    if (words[i].length < 4 || words[i].length > shakeResult.length * shakeResult.length) {
    }
    else {
        filteredOnce.push(words[i]);
    }
}

//////////////
// filter 2 //
//////////////

let filteredTwice = [];
for (let i = 0; i < filteredOnce.length; i++) {
    let noMatch = false;
    for (let c = 0; c < filteredOnce[i].length; c++) {
        if (shakeString.count(filteredOnce[i][c]) === 0) {
            noMatch = true;
            break;
        }
    }

    if (noMatch === false) {
        filteredTwice.push(filteredOnce[i]);
    }
}

//////////////
// filter 3 //
//////////////

let filteredThrice = [];
for (let i = 0; i < filteredTwice.length; i++) {
    let noMatch = false;
    for (let c = 0; c < filteredTwice[i].length; c++) {
        
        if (filteredTwice[i].count(filteredTwice[i][c]) > shakeString.count(filteredTwice[i][c])) {
            noMatch = true;
            break;
        }
    }

    if (noMatch === false) {
        filteredThrice.push(filteredTwice[i]);
    }
}

//////////////
// filter 4 //
//////////////

let lastFilter = [];
for (let i = 0; i < filteredThrice.length; i++) {
    let eachCoord = [];
    let trueCounter = 0;
    let tempShakeString = shakeString;
    for (let c = 0; c < filteredThrice[i].length; c++) {
        let indexed = tempShakeString.indexOf(filteredThrice[i][c]);
        eachCoord.push(coord[indexed]);
        tempShakeString = tempShakeString.replace(tempShakeString[indexed], ' ');
    }

    for (let n = 0; n < eachCoord.length; n++) {
        if (n < eachCoord.length - 1) {
            if (Math.abs(eachCoord[n][0] - eachCoord[n + 1][0]) < 2) {
                if (Math.abs(eachCoord[n][1] - eachCoord[n + 1][1]) < 2) {
                    eachCoord[n] = true;
                    trueCounter++;
                }
                else {
                    eachCoord[n] = false;
                }
            }
            else {
                eachCoord[n] = false;
            }
        }
        else {
            eachCoord[n] = true;
            trueCounter++;
        }
    }

    //adding to result
    
    if (trueCounter === filteredThrice[i].length) {
        lastFilter.push(filteredThrice[i]);
    }
}

console.log(lastFilter);