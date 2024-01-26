// App.js
import {React, useState} from 'react';
import { SafeAreaView, StyleSheet, Text, Button } from 'react-native';
import BigBoard from './BigBoard';
import Game from './Game';
import monteCarloTreeSearch from './MonteCarloTreeSearch.js';



const App = () => {
  const initialGame = new Game('O');
  const [gameInstance, setGame] = useState(initialGame);

  const onPressCell = (smallBoardIndex, pos) => {
    console.log(`Cell pressed: smallBoardIndex=${smallBoardIndex}, pos=${pos}`);

    let newGameInstance = gameInstance.clone();

    if (newGameInstance.makeMove(smallBoardIndex, pos)){
      setGame(newGameInstance);
    }

    if (gameInstance.boardOfNextMove === -2) {
      alert(gameInstance.previousPlayer + ' WINS!');
      return;
    }

    setTimeout(() => {
      // Trigger AI move after a delay
      AIMove();
    }, 500); // 500 milliseconds delay as an example

    if (gameInstance.boardOfNextMove === -2) {
      alert(gameInstance.previousPlayer + ' WINS!');
      return;
    }
  }

  const AIMove = async () => {
     
    // Simulate AI thinking by delaying the move
    // You can adjust the delay based on your preference
    // For example, you can use await new Promise(resolve => setTimeout(resolve, 1000));
    const currentGameInstance = gameInstance.clone();

    await new Promise(resolve => setTimeout(resolve, 500));
    const newState = monteCarloTreeSearch(currentGameInstance, 10);
    const newGame = Game.fromState(newState);
    setGame(newGame);
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ultimate Tic-Tac-Toe</Text>
      <BigBoard bigBoard={gameInstance.bigBoard} winnerBoard={gameInstance.winnerBoard} boardOfNextMove={gameInstance.boardOfNextMove} onPressCell={onPressCell} AITurn={gameInstance.AITurn}/>
      
      
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

export default App;
