'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, columnIndex) {
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('The tile has already been flipped');
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(columnIndex).toString();
      }
      this._numberOfTiles--;
    }
  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborIndices = [[rowIndex - 1, columnIndex - 1], [rowIndex - 1, columnIndex], [rowIndex - 1, columnIndex + 1], [rowIndex, columnIndex - 1], [rowIndex, columnIndex + 1], [rowIndex + 1, columnIndex - 1], [rowIndex + 1, columnIndex], [rowIndex + 1, columnIndex + 1]];

      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      var numberOfBombs = 0;

      neighborIndices.forEach(function (neighbor) {
        var r = neighbor[0];
        var c = neighbor[1];
        if (r >= 0 && r < numberOfRows && c >= 0 && c < numberOfColumns) {
          if (_this._bombBoard[r][c] === 'B') {
            numberOfBombs++;
          }
        }
      });

      return numberOfBombs;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }
  }, {
    key: 'print',
    value: function print() {
      var prettyBoard = this._playerBoard.map(function (row) {
        return row.join(' | ');
      });
      prettyBoard = prettyBoard.join('\n');
      console.log(prettyBoard);
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'getRandomInt',
    value: function getRandomInt(min, max) {
      var minInt = Math.ceil(min);
      var maxInt = Math.floor(max);
      return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
    }
  }, {
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];

      for (var i = 0; i < numberOfRows; i++) {
        var row = [];
        for (var j = 0; j < numberOfColumns; j++) {
          row.push(' ');
        }
        board.push(row);
      }

      return board;
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];

      for (var i = 0; i < numberOfRows; i++) {
        var row = [];
        for (var j = 0; j < numberOfColumns; j++) {
          row.push(' ');
        }
        board.push(row);
      }

      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        var ri = Board.getRandomInt(0, numberOfRows);
        var ci = Board.getRandomInt(0, numberOfColumns);
        if (board[ri][ci] !== 'B') {
          board[ri][ci] = 'B';
          numberOfBombsPlaced++;
        }
      }

      return board;
    }
  }]);

  return Board;
}();

exports.default = Board;