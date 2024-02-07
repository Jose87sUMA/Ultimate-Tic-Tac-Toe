// GameplayScreen.js
import React, {useContext, useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, useWindowDimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
import * as Progress from 'react-native-progress';

import Sentry from 'sentry-expo';

import BigBoard from './BigBoard.js';
import WinnerModal from './WinnerModal.js';
import Game from '../GameLogic/Game.js';
import monteCarloTreeSearch from '../GameLogic/MonteCarloTreeSearch.js';

import { ColorContext } from '../styles/contexts/ColorContext.js';
import ColorsPalette from '../styles/colorsPalettes/ColorsPalette.js';
import ColorsPaletteSoft from '../styles/colorsPalettes/ColorsPaletteSoft.js';


import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    Acme: require('../assets/fonts/Acme.ttf'), 
  });
};

const GamePlayScreen = ({route, navigation}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const { continuingGame, AIMoveSymbol } = route.params;

  const initialGame = new Game(AIMoveSymbol);
  const [gameInstance, setGame] = useState(initialGame);
  const [modalVisible, setModalVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  const {valueX, valueO} = useContext(ColorContext);

  const {width} = useWindowDimensions();
  const fontSize = width < 750? 20:40;

  const onPressCell = (smallBoardIndex, pos) => {

    let newGameInstance = gameInstance.clone();

    if (newGameInstance.makeMove(smallBoardIndex, pos)) {
      setGame(newGameInstance);
      AsyncStorage.setItem('game', JSON.stringify(newGameInstance));
    } else {
      return;
    }

    if(newGameInstance.getWinner() !== null){
      setModalVisible(true);
      newGameInstance.storeFinishedGame();
      AsyncStorage.removeItem('game');
      return;
    }

    if(gameInstance.AISymbol !== ' '){
      AIMove(newGameInstance);
    }
  }

  const AIMove = async (newGameInstance) => {
    setProgress(0);
    await new Promise(resolve => setTimeout(resolve, 500));
    await monteCarloTreeSearch(newGameInstance, 5, setProgress).then((newState) => {
      const newGame = Game.fromState(newState);
      AsyncStorage.setItem('game', JSON.stringify(newGame));
      setGame(newGame);
    });
  };


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
          Sentry.Native.captureException('Error retrieving game from AsyncStorage:', error);
        }
      };
    
      getGameFromStorage();
    }
    else if(AIMoveSymbol === 'X'){
      AIMove(gameInstance);
    }
  }, []);

  if (!fontsLoaded) {
    return null; // You can render a loading component or return null until the fonts are loaded
  }

  const winner = gameInstance.getWinner();
  const currentPlayerColor = gameInstance.currentPlayer === 'X' ? ColorsPalette[valueX] : ColorsPalette[valueO];
  return (
    <SafeAreaView style={styles.container}>
      <WinnerModal modalVisible={modalVisible} winner={winner} setModalVisible={setModalVisible} navigation={navigation}/>
      
      <Text style={{...styles.currentPlayerText, color: currentPlayerColor, fontSize: fontSize}}>{gameInstance.currentPlayer} turn</Text>
      <View style={{...styles.separator, backgroundColor: currentPlayerColor,}}/>
      {gameInstance.AISymbol !== ' ' && 
      <View style={{alignItems: 'center', marginBottom: 20}}>
        <Progress.Bar progress={progress/100} width={400} color={gameInstance.AISymbol === 'X' ? ColorsPalette[valueX] : ColorsPalette[valueO] }/>
      </View>}
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
  separator:{
    height: 2,
    alignSelf: 'center',
    width: '100%',
    marginBottom: 25
  }
});

export default GamePlayScreen;
