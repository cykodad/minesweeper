'use strict';

function getRandomInt(min, max) {
  var minInt = Math.ceil(min);
  var maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
}

var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
  var board = [];

  for (var i = 0; i < numberOfRows; i++) {
    var row = [];
    for (var j = 0; j < numberOfColumns; j++) {
      row.push(' ');
    }
    board.push(row);
  }

  return board;
};

var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
  var board = [];

  for (var i = 0; i < numberOfRows; i++) {
    var row = [];
    for (var j = 0; j < numberOfColumns; j++) {
      row.push(null);
    }
    board.push(row);
  }

  var numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    var ri = getRandomInt(0, numberOfRows);
    var ci = getRandomInt(0, numberOfColumns);
    if (board[ri][ci] === null) {
      board[ri][ci] = 'B';
      numberOfBombsPlaced++;
    }
  }

  return board;
};

var printBoard = function printBoard(board) {
  var prettyBoard = board.map(function (row) {
    return row.join(' | ');
  });
  prettyBoard = prettyBoard.join('\n');
  console.log(prettyBoard);
};

var playerBoard = generatePlayerBoard(3, 4);
console.log('Player Board:');
printBoard(playerBoard);

var bombBoard = generateBombBoard(3, 4, 5);
console.log('\nBomb Board:');
printBoard(bombBoard);