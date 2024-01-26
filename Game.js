// Game.js

class Game {
  constructor(AI) {
    this.bigBoard = Array(9).fill(Array(9).fill(' '));
    this.winnerBoard = Array(9).fill(' ');
    this.boardOfNextMove = -1;
    this.currentPlayer = 'X';
    this.previousPlayer = 'O';
    this.AISymbol = AI;
    this.AITurn = AI === this.currentPlayer;
  }

  static fromState(obj) {
    const newGame = new Game(obj.AISymbol);
    newGame.bigBoard = obj.bigBoard.map((smallBoard) => [...smallBoard]);
    newGame.winnerBoard = [...obj.winnerBoard];
    newGame.boardOfNextMove = obj.boardOfNextMove;
    newGame.currentPlayer = obj.currentPlayer;
    newGame.previousPlayer = obj.previousPlayer;
    newGame.AITurn = obj.AITurn;
    return newGame;
  }

  boardAvailable(board) {
    return board.includes(' ');
  }

  checkWinnerBoard(board) {
    for (let i = 0; i < 3; i++) {
      if (
        board[i * 3] === board[i * 3 + 1] &&
        board[i * 3] === board[i * 3 + 2] &&
        board[i * 3] !== ' '
      ) {
        return board.fill(board[i * 3]);
      }

      if (
        board[i] === board[i + 3] &&
        board[i] === board[i + 6] &&
        board[i] !== ' '
      ) {
        return board.fill(board[i]);
      }
    }

    if (
      (board[0] === board[4] && board[0] === board[8] && board[0] !== ' ') ||
      (board[2] === board[4] && board[2] === board[6] && board[2] !== ' ')
    ) {
      return board.fill(board[4]);
    }

    return null;
  }

  getLegalMoves() {

    const legalMoves = [];
    const smallBoard = this.boardOfNextMove;

    if (smallBoard === -1) 
    {
      // If no small board restriction, all empty positions are legal moves
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (this.bigBoard[i][j] === ' ') {
            legalMoves.push({ smallBoard: i, pos: j });
          }
        }
      }
    }
    else
    {
      for (let j = 0; j < 9; j++) {
        if (this.bigBoard[smallBoard][j] === ' ') {
          legalMoves.push({ smallBoard: smallBoard, pos: j });
        }
      }
    }

    return legalMoves;

  }

  makeMove(smallBoardIndex, pos) {

    // CHECK RESTRICTIONS
    if ((this.boardOfNextMove !== -1 && this.boardOfNextMove !== smallBoardIndex) || this.boardOfNextMove === -2) 
    {
      return false;
    }

    // CHECK AVAILABILITY
    if (this.bigBoard[smallBoardIndex][pos] !== ' ') {
      return false;
    }

    // MAKE MOVE
    this.bigBoard[smallBoardIndex][pos] = this.currentPlayer;

    // CHECK SMALL BOARD WINNER
    if (this.checkWinnerBoard(this.bigBoard[smallBoardIndex]) !== null) {
      this.winnerBoard[smallBoardIndex] = this.currentPlayer;
    }

    // SET NEW RESTRICTION
    if (!this.boardAvailable(this.bigBoard[pos])) {
      pos = -1;
    }

    // CHECK BIG BOARD WINNER
    if (this.isTerminal()) {
      pos = -2;
    }

    // UPDATE VALUES
    this.boardOfNextMove = pos
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    this.previousPlayer = this.previousPlayer === 'X' ? 'O' : 'X';
    this.AITurn = !this.AITurn;

    return true;
  }

  isTerminal() {
    return this.checkWinnerBoard(this.winnerBoard) !== null || this.bigBoard.every(smallBoard => !this.boardAvailable(smallBoard));
  }

  getWinner() {
    return this.checkWinnerBoard(this.winnerBoard);
  }

  clone() {
    const clonedBoard = this.bigBoard.map((smallBoard) => [...smallBoard]);
    const clonedWinnerBoard = [...this.winnerBoard];
    let newGame = new Game(this.AI);
    newGame.bigBoard = clonedBoard;
    newGame.winnerBoard = clonedWinnerBoard;
    newGame.boardOfNextMove = this.boardOfNextMove;
    newGame.currentPlayer = this.currentPlayer;
    newGame.previousPlayer = this.previousPlayer;
    newGame.AITurn = this.AITurn;
    return newGame;
  }

}

export default Game;

