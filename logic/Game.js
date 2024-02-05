// Game.js
import AsyncStorage from '@react-native-async-storage/async-storage';

class Game {
  constructor(AISymbol) {
    this.bigBoard = Array(9).fill(Array(9).fill(' '));
    this.winnerBoard = Array(9).fill(' ');
    this.boardOfNextMove = -1;
    this.currentPlayer = 'X';
    this.previousPlayer = 'O';
    this.AISymbol = AISymbol;
    this.AITurn = AISymbol === this.currentPlayer;
    this.moves = [];
    this.currentMove = -1;
  }

  static fromState(obj) {
    const newGame = new Game(obj.AISymbol);
    newGame.bigBoard = obj.bigBoard.map((smallBoard) => [...smallBoard]);
    newGame.winnerBoard = [...obj.winnerBoard];
    newGame.boardOfNextMove = obj.boardOfNextMove;
    newGame.currentPlayer = obj.currentPlayer;
    newGame.previousPlayer = obj.previousPlayer;
    newGame.moves = [...obj.moves];
    newGame.currentMove = obj.currentMove;
    newGame.AITurn = obj.AITurn;
    newGame.AISymbol = obj.AISymbol;
    newGame.finishedDate = obj.finishedDate;
    return newGame;
  }

  boardAvailable(board) {
    return this.checkWinnerBoard(board) === null && board.some((cell) => cell === ' ');
  }

  checkWinnerBoard(board) {
    for (let i = 0; i < 3; i++) {
      if (
        board[i * 3] === board[i * 3 + 1] &&
        board[i * 3] === board[i * 3 + 2] &&
        board[i * 3] !== ' '
      ) {
        return board[i * 3];
      }

      if (
        board[i] === board[i + 3] &&
        board[i] === board[i + 6] &&
        board[i] !== ' '
      ) {
        return board[i * 3];
      }
    }

    if (
      (board[0] === board[4] && board[0] === board[8] && board[0] !== ' ') ||
      (board[2] === board[4] && board[2] === board[6] && board[2] !== ' ')
    ) {
      return board[4];
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
    this.moves.push({ smallBoard: smallBoardIndex, pos: pos });
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

      this.finishedDate = new Date().toLocaleString();

      //Save the game to the list of finished games
      this.storeFinishedGame();
    }

    // UPDATE VALUES
    this.boardOfNextMove = pos
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    this.previousPlayer = this.previousPlayer === 'X' ? 'O' : 'X';
    this.currentMove++;
    this.AITurn = this.AISymbol === this.currentPlayer;

    return true;
  }

  storeFinishedGame() {
    AsyncStorage.getItem('finishedGames').then((value) => {
      if (value === null) {
        AsyncStorage.setItem('finishedGames', JSON.stringify([this]));
      }
      else {
        let finishedGames = JSON.parse(value);
        finishedGames.push(this);
        AsyncStorage.setItem('finishedGames', JSON.stringify(finishedGames));
      }
    });
  }

  isTerminal() {
    return this.checkWinnerBoard(this.winnerBoard) !== null || this.bigBoard.every(smallBoard => !this.boardAvailable(smallBoard));
  }

  getWinner() {
    const winner = this.checkWinnerBoard(this.winnerBoard);
    if(this.isTerminal())
      return this.checkWinnerBoard(this.winnerBoard) === null ? ' ': winner;
    else
      return null;
  }

  clone() {
    const clonedBoard = this.bigBoard.map((smallBoard) => [...smallBoard]);
    const clonedWinnerBoard = [...this.winnerBoard];
    let newGame = new Game(this.AISymbol);
    newGame.bigBoard = clonedBoard;
    newGame.winnerBoard = clonedWinnerBoard;
    newGame.boardOfNextMove = this.boardOfNextMove;
    newGame.currentPlayer = this.currentPlayer;
    newGame.previousPlayer = this.previousPlayer;
    newGame.moves = [...this.moves];
    newGame.currentMove = this.currentMove;
    newGame.AITurn = this.AITurn;
    newGame.AISymbol = this.AISymbol;
    newGame.finishedDate = this.finishedDate;
    return newGame;
  }

  positionOneMoveBack() {
    if (this.currentMove === -1) {
      return;
    }
    const lastMove = this.moves[this.currentMove];
    console.log(lastMove);
    this.bigBoard[lastMove.smallBoard][lastMove.pos] = ' ';

    // CHECK SMALL BOARD WINNER
    if (this.checkWinnerBoard(this.bigBoard[lastMove.smallBoard]) === null) {
      this.winnerBoard[lastMove.smallBoard] = ' ';
    }
    
    // SET NEW RESTRICTION
    if (this.currentMove === 0 || !this.boardAvailable(this.bigBoard[this.moves[this.currentMove-1].pos])) {
      this.boardOfNextMove = -1;
    }
    else{
      this.boardOfNextMove = this.moves[this.currentMove-1].pos;
    }

    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    this.previousPlayer = this.previousPlayer === 'X' ? 'O' : 'X';
    this.currentMove--;
    this.AITurn = this.AISymbol === this.currentPlayer;

  }

  positionOneMoveForward() {
    if (this.currentMove === this.moves.length-1) {
      return;
    }
    this.currentMove++;
    const nextMove = this.moves[this.currentMove];
    this.bigBoard[nextMove.smallBoard][nextMove.pos] = this.currentPlayer;

    // CHECK SMALL BOARD WINNER
    if (this.checkWinnerBoard(this.bigBoard[nextMove.smallBoard]) !== null) {
      this.winnerBoard[nextMove.smallBoard] = this.currentPlayer;
    }

    // SET NEW RESTRICTION
    if (!this.boardAvailable(this.bigBoard[nextMove.pos])) {
      this.boardOfNextMove = -1;
    }
    else{
      this.boardOfNextMove = nextMove.pos;
    }

    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    this.previousPlayer = this.previousPlayer === 'X' ? 'O' : 'X';
    this.AITurn = this.AISymbol === this.currentPlayer;

  }

}

export default Game;

