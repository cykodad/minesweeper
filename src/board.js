class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(
      numberOfRows,
      numberOfColumns
    );
    this._bombBoard = Board.generateBombBoard(
      numberOfRows,
      numberOfColumns,
      numberOfBombs
    );
  }

  static getRandomInt(min, max) {
    let minInt = Math.ceil(min);
    let maxInt = Math.floor(max);
    return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];

    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      for (let j = 0; j < numberOfColumns; j++) {
        row.push(' ');
      }
      board.push(row);
    }

    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];

    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      for (let j = 0; j < numberOfColumns; j++) {
        row.push(' ');
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      let ri = Board.getRandomInt(0, numberOfRows);
      let ci = Board.getRandomInt(0, numberOfColumns);
      if (board[ri][ci] !== 'B') {
        board[ri][ci] = 'B';
        numberOfBombsPlaced++;
      }
    }

    return board;
  }

  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('The tile has already been flipped');
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(
        columnIndex
      ).toString();
    }
    this._numberOfTiles--;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    let neighborIndices = [
      [rowIndex - 1, columnIndex - 1],
      [rowIndex - 1, columnIndex],
      [rowIndex - 1, columnIndex + 1],
      [rowIndex, columnIndex - 1],
      [rowIndex, columnIndex + 1],
      [rowIndex + 1, columnIndex - 1],
      [rowIndex + 1, columnIndex],
      [rowIndex + 1, columnIndex + 1],
    ];

    let numberOfRows = this._bombBoard.length;
    let numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighborIndices.forEach(neighbor => {
      let r = neighbor[0];
      let c = neighbor[1];
      if (r >= 0 && r < numberOfRows && c >= 0 && c < numberOfColumns) {
        if (this._bombBoard[r][c] === 'B') {
          numberOfBombs++;
        }
      }
    });

    return numberOfBombs;
  }

  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  print() {
    let prettyBoard = this._playerBoard.map(row => row.join(' | '));
    prettyBoard = prettyBoard.join('\n');
    console.log(prettyBoard);
  }
}

export default Board;
