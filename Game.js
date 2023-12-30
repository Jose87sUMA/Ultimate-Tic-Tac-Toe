// Game.js
import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, Alert} from 'react-native';
import BigBoard from './BigBoard';
import { Button } from 'react-native-paper';
import Orientation from 'react-native-orientation-locker';

const Game = () => {
  const [bigBoard, setBoard] = useState(Array(9).fill(Array(9).fill(' ')));
  const [winnerBoard, setWinnerBoard] = useState(Array(9).fill(' '));
  const [boardOfNextMove, setBoardOfNextMove] = useState(-1);
  const [currentPlayer, setCurrentPlayer] = useState('X');

const onPressCell = (smallBoardIndex, pos) => {
  console.log(`Cell pressed: smallBoardIndex=${smallBoardIndex}, pos=${pos}`);

  if(smallBoardIndex === 0 && pos === 0) {
    winnerBoard[0] = 'X';
  }

  if((boardOfNextMove !== -1 && boardOfNextMove !== smallBoardIndex) || boardOfNextMove === -2) {
    return;
  }
  if (bigBoard[smallBoardIndex][pos] !== ' ') {
    return;
  }

  // Create a copy of the bigBoard array
  const newBigBoard = bigBoard.map(row => [...row]);

  // Update the specific small board
  newBigBoard[smallBoardIndex][pos] = currentPlayer;

  if(checkWinnerBoard(newBigBoard[smallBoardIndex]) !== null) {
    winnerBoard[smallBoardIndex] = currentPlayer;
  }

  if(!boardAvailable(newBigBoard[pos])) {
    pos = -1;
  }

  if(checkWinnerBoard(winnerBoard) !== null) {
    Alert.alert('', currentPlayer + ' WINS!',);
    pos = -2;
  }
  
  // Update the state with the modified bigBoard and switch players
  setBoard(newBigBoard);
  setWinnerBoard(winnerBoard);
  setBoardOfNextMove(pos);
  setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
};

const boardAvailable = (smallBoard) => {
    // Otherwise, the board is not available
    return smallBoard.includes(' ');
}

const checkWinnerBoard = (board) => {
    // Check rows, columns, and diagonals for a winner
    for (let i = 0; i < 3; i++) {
        
      // Check rows
      if (
        board[i * 3] === board[i * 3 + 1] &&
        board[i * 3] === board[i * 3 + 2] &&
        board[i * 3] !== ' '
      ) 
      {
        return board.fill(board[i * 3]);
      }
  
      // Check columns
      if (
        board[i] === board[i + 3] &&
        board[i] === board[i + 6] &&
        board[i] !== ' '
      ) 
      {
        return board.fill(board[i]);
      }
    }
  
    // Check diagonals
    if (
      (board[0] === board[4] && board[0] === board[8] && board[0] !== ' ') ||
      (board[2] === board[4] && board[2] === board[6] && board[2] !== ' ')
    ) 
    {
      return board.fill(board[4]);
    }
  
    // No winner
    return null;
}

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ultimate Tic-Tac-Toe</Text>
      <BigBoard bigBoard={bigBoard} winnerBoard={winnerBoard} boardOfNextMove={boardOfNextMove} onPressCell={onPressCell} />
      
      <Button mode="contained" onPress={() => {
        setBoard(Array(9).fill(Array(9).fill(' '))); 
        setWinnerBoard(Array(9).fill(' ')); 
        setBoardOfNextMove(-1); 
        setCurrentPlayer('X');}}>Reset</Button>

      <Button mode="contained" onPress={() => {
        fillLeft = Array(9).fill(' ');
        fillLeft[0] = 'X';
        fillLeft[3] = 'O';
        fillLeft[6] = 'X';
        setWinnerBoard(fillLeft); 
        }}>fill Left</Button>
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Game;
