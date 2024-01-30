// GameplayScreen.js
import {React, useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BigBoard from './BigBoard.js';
import Game from './Game.js';
import monteCarloTreeSearch from './MonteCarloTreeSearch.js';

const GamePlayScreen = ({route, navigation}) => {

  const { continuingGame, AIMoveSymbol } = route.params;
  console.log('GamePlayScreen props:', continuingGame);
  const initialGame = new Game(AIMoveSymbol);
  const [gameInstance, setGame] = useState(initialGame);

  if(continuingGame){
    useEffect(() => {
      const getGameFromStorage = async () => {
        try {
          const storedGame = await AsyncStorage.getItem('game');
          const parsedGame = storedGame ? Game.fromState(JSON.parse(storedGame)) : null;
          setGame(parsedGame);
        } catch (error) {
          console.error('Error retrieving game from AsyncStorage:', error);
        }
      };
    
      getGameFromStorage();
    
    }, []);
  }    

  const onPressCell = (smallBoardIndex, pos) => {
    console.log(`Cell pressed: smallBoardIndex=${smallBoardIndex}, pos=${pos}`);

    let newGameInstance = gameInstance.clone();

    if (newGameInstance.makeMove(smallBoardIndex, pos)) {
      setGame(newGameInstance);
      AsyncStorage.setItem('game', JSON.stringify(newGameInstance));
    } else {
      return;
    }

    setTimeout(() => {
      // Trigger AI move after a delay
      AIMove();
    }, 500); // 500 milliseconds delay as an example    

  }

  const AIMove = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));

    setGame(prevGame => {
      const newState = monteCarloTreeSearch(prevGame, 10);
      const newGame = Game.fromState(newState);
      AsyncStorage.setItem('game', JSON.stringify(newGame));
      return newGame;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ultimate Tic-Tac-Toe</Text>
      <BigBoard bigBoard={gameInstance.bigBoard} winnerBoard={gameInstance.winnerBoard} boardOfNextMove={gameInstance.boardOfNextMove} onPressCell={onPressCell} AITurn={gameInstance.AITurn}/>
      <Text style={styles.menu}>Click</Text>
      
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

export default GamePlayScreen;
