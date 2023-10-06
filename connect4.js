/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
class Game{
  constructor(){
    console.log(document.getElementById("plColor"))
    const colorOne = document.getElementById("plColor").value
    console.log(document.querySelector("#plColor"))
    const colorTwo = document.getElementById("#p2Color").value
    this.width = 7;
    this.height = 6;
    // this.currPlayer = 1
    this.playerOne = new Player(colorOne)
    console.log(this.playerOne.color)
    this.playerTwo = new Player(colorTwo)
    this.currPlayer = this.playerOne
    this.board = []
    this.win = false
  }

 // active player: 1 or 2
 // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */

makeBoard() {
  for (let y = 0; y < this.height; y++) {
    this.board.push(Array.from({ length: this.width }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

makeHtmlBoard() {
  const board = document.getElementById('board');

  // make column tops (clickable area for adding a piece to that column)
  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top');
  // top.addEventListener('click', this.handleClick);
  this.handleGameClick = this.handleClick.bind(this);
  top.addEventListener("click", this.handleGameClick);


  for (let x = 0; x < this.width; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell);
  }

  board.append(top);

  // make main part of board
  for (let y = 0; y < this.height; y++) {
    const row = document.createElement('tr');

    for (let x = 0; x < this.width; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }

    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

findSpotForCol(x) {
  for (let y = this.height - 1; y >= 0; y--) {
    if (!this.board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  if(this.currPlayer == this.playerOne){
    piece.backgroundColor = this.playerOne.color;
  }
  console.log(this.playerTwo.color)
  if(this.currPlayer == this.playerTwo){
    piece.backgroundColor = this.playerTwo.color;
    console.log(this.playerTwo.color)
  }
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

/** endGame: announce game end */

endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = this.findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  if(!this.win){
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);
  }
  
  // check for win
  if (this.checkForWin()) {
    this.win = true
    return this.endGame(`Player ${this.currPlayer} won!`);
  }
  
  // check for tie
  if (this.board.every(row => row.every(cell => cell))) {
    return this.endGame('Tie!');
  }
    
  // switch players
  this.currPlayer = this.currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

checkForWin() {
  const _win = cells =>
      cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.currPlayer
      );

  for (let y = 0; y < this.height; y++) {
    for (let x = 0; x < this.width; x++) {
      // get "check list" of 4 cells (starting here) for each of the different
      // ways to win
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

}

// makeBoard();
// makeHtmlBoard();
// const newGame = new Game()
// newGame.makeBoard();
// newGame.makeHtmlBoard();
const startButton = document.querySelector("#Start")
startButton.addEventListener("click", function(){
  const newGame = new Game()
  newGame.makeBoard();
  newGame.makeHtmlBoard();
})

class  Player{
  constructor(color){
    this.color = color
  }
}