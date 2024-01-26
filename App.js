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

    if(gameInstance.boardOfNextMove === -2)
      alert(gameInstance.previousPlayer + ' WINS!');
    else{
      const newState = monteCarloTreeSearch(newGameInstance, 10);
      const newGame = Game.fromState(newState); 
      setGame(newGame);
    }
    
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
