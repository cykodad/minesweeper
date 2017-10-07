'use strict';

var blankLine = '  |   |  ';

console.log('This is what an empty board would look like:');

for (var i = 0; i < 3; i++) {
    console.log(blankLine);
}

var guessLine = '1 |   |  ';
var bombLine = '  | B |  ';

console.log('This is what a board with a guess and a board might look like:');
console.log(guessLine);
console.log(bombLine);
console.log(blankLine);