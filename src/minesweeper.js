function getRandomInt(min, max) {
  let minInt = Math.ceil(min);
  let maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
}

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];

  for (let i = 0; i < numberOfRows; i++) {
    let row = [];
    for (let j = 0; j < numberOfColumns; j++) {
      row.push(' ');
    }
    board.push(row);
  }

  return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];

  for (let i = 0; i < numberOfRows; i++) {
    let row = [];
    for (let j = 0; j < numberOfColumns; j++) {
      row.push(null);
    }
    board.push(row);
  }

  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    let ri = getRandomInt(0, numberOfRows);
    let ci = getRandomInt(0, numberOfColumns);
    if (board[ri][ci] === null) {
      board[ri][ci] = 'B';
      numberOfBombsPlaced++;
    }
  }

  return board;
};

const printBoard = board => {
  let prettyBoard = board.map(row => row.join(' | '));
  prettyBoard = prettyBoard.join('\n');
  console.log(prettyBoard);
};

let playerBoard = generatePlayerBoard(3, 4);
console.log('Player Board:');
printBoard(playerBoard);

let bombBoard = generateBombBoard(3, 4, 5);
console.log('\nBomb Board:');
printBoard(bombBoard);
