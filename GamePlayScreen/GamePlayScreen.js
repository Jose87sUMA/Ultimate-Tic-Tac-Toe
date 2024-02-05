// GameplayScreen.js
import {React, useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeButton, { ThemedButton } from "react-native-really-awesome-button";
import { useTheme } from '@react-navigation/native';

import BigBoard from './BigBoard.js';
import Game from '../logic/Game.js';
import monteCarloTreeSearch from '../logic/MonteCarloTreeSearch.js';

import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    Acme: require('../assets/fonts/Acme.ttf'), 
  });
};

const GamePlayScreen = ({route, navigation}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const {colors} = useTheme();

  const { continuingGame, AIMoveSymbol } = route.params;

  const initialGame = new Game(AIMoveSymbol);
  const [gameInstance, setGame] = useState(initialGame);
  const [modalVisible, setModalVisible] = useState(false);

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
      AsyncStorage.deleteItem('game');
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
      const newState = monteCarloTreeSearch(prevGame, 5);
      const newGame = Game.fromState(newState);
      AsyncStorage.setItem('game', JSON.stringify(newGame));
      return newGame;
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
        }
      };
    
      getGameFromStorage();
    }
    else if(AIMoveSymbol === 'X'){
      setTimeout(() => {
        // Trigger AI move after a delay
        AIMove();
      }, 500); // 500 milliseconds delay as an exampl
    }
  }, []);
  

  if (!fontsLoaded) {
    return null; // You can render a loading component or return null until the fonts are loaded
  }

  const winner = gameInstance.getWinner();
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={{...styles.modalContainer}}>
            <Text style={{
              ...styles.modalText, 
              color: winner === ' ' ? colors.text : winner === 'X' ? '#007AFF' : '#FF3B30'
            }}>{winner === ' ' ? 'It\'s a tie!' : winner + ' wins!'}</Text>
            <AwesomeButton 
              borderWidth= {2}
              backgroundColor={winner === ' ' ? colors.text : winner === 'X' ? '#007AFF' : '#FF3B30'}
              borderColor='#000000'
              backgroundDarker='#000000'
              textColor='#FBFBFB'
              raiseLevel={2}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('HomeScreen');
            }}
            >Go Home</AwesomeButton>
          </View>
        </View>
      </Modal>
      <Button title='delete all games' onPress={() => {
        AsyncStorage.removeItem('finishedGames');
      }}></Button>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    height: '20%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    width: '100%',
    fontSize: 42,
    textAlign: 'center',
    fontFamily: 'Acme',
  },
  currentPlayerText: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'Acme',
  },
});

export default GamePlayScreen;
