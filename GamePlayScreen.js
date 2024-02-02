// GameplayScreen.js
import {React, useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BigBoard from './BigBoard.js';
import Game from './Game.js';
import monteCarloTreeSearch from './MonteCarloTreeSearch.js';

import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    Acme: require('./assets/fonts/Acme.ttf'), 
  });
};

const GamePlayScreen = ({route, navigation}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const { continuingGame, AIMoveSymbol } = route.params;

  const initialGame = new Game(AIMoveSymbol);
  const [gameInstance, setGame] = useState(initialGame);

  useEffect(() => {

    const loadAsync = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadAsync();
    if(continuingGame){
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
    }
    else if(AIMoveSymbol === 'X'){
      
      useEffect(() => {
        AIMove();
      }, []);
    }
  }, []);
  

  if (!fontsLoaded) {
    return null; // You can render a loading component or return null until the fonts are loaded
  }

  const onPressCell = (smallBoardIndex, pos) => {

    let newGameInstance = gameInstance.clone();

    if (newGameInstance.makeMove(smallBoardIndex, pos)) {
      setGame(newGameInstance);
      AsyncStorage.setItem('game', JSON.stringify(newGameInstance));
    } else {
      return;
    }

    if(gameInstance.AISymbol !== ' '){
      setTimeout(() => {
        // Trigger AI move after a delay
        AIMove();
      }, 500); // 500 milliseconds delay as an example    
    }
  }

  const AIMove = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));

    setGame(prevGame => {
      const newState = monteCarloTreeSearch(prevGame, 20);
      const newGame = Game.fromState(newState);
      AsyncStorage.setItem('game', JSON.stringify(newGame));
      return newGame;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{...styles.currentPlayerText, color: gameInstance.currentPlayer === 'X' ? '#007AFF' : '#FF3B30'}}>{gameInstance.currentPlayer} turn</Text>
      <View style={{height: 2, width: '100%', backgroundColor: gameInstance.currentPlayer === 'X' ? '#007AFF' : '#FF3B30', marginBottom: 25}} />
      <BigBoard bigBoard={gameInstance.bigBoard} winnerBoard={gameInstance.winnerBoard} boardOfNextMove={gameInstance.boardOfNextMove} currentPlayer={gameInstance.currentPlayer} onPressCell={onPressCell} AITurn={gameInstance.AITurn}/>
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
  currentPlayerText: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'Acme',
  },
});

export default GamePlayScreen;
