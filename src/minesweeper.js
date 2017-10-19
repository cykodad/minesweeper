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
      row.push(' ');
    }
    board.push(row);
  }

  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    let ri = getRandomInt(0, numberOfRows);
    let ci = getRandomInt(0, numberOfColumns);
    if (board[ri][ci] !== 'B') {
      board[ri][ci] = 'B';
      numberOfBombsPlaced++;
    }
  }

  return board;
};

const getNumberOfNeighborBombs = (bombBoard, ri, ci) => {
  let neighborIndices = [
    [ri - 1, ci - 1],
    [ri - 1, ci],
    [ri - 1, ci + 1],
    [ri, ci - 1],
    [ri, ci + 1],
    [ri + 1, ci - 1],
    [ri + 1, ci],
    [ri + 1, ci + 1],
  ];

  let numberOfRows = bombBoard.length;
  let numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;

  neighborIndices.forEach(neighbor => {
    let r = neighbor[0];
    let c = neighbor[1];
    if (r >= 0 && r < numberOfRows && c >= 0 && c < numberOfColumns) {
      if (bombBoard[r][c] === 'B') {
        numberOfBombs++;
      }
    }
  });

  return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('The tile has already been flipped');
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(
      bombBoard,
      rowIndex,
      columnIndex
    ).toString();
  }
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

flipTile(playerBoard, bombBoard, 0, 0);

console.log('\nUpdated Player Board:');
printBoard(playerBoard);
