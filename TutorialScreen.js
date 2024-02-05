import {React, useState, useRef, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import AwesomeButton, { ThemedButton } from "react-native-really-awesome-button";
import * as Font from 'expo-font';
import { useTheme } from '@react-navigation/native';

import BigBoard from './GamePlayScreen/BigBoard';
import Game from './logic/Game';
import monteCarloTreeSearch from './logic/MonteCarloTreeSearch.js';


const loadFonts = async () => {
  await Font.loadAsync({
    Acme: require('./assets/fonts/Acme.ttf'), 
  });
};
const TutorialScreen = ({navigation}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const {colors} = useTheme();

  const initialGame = new Game('O');
  const [gameInstance, setGame] = useState(initialGame);
  const [modalVisible, setModalVisible] = useState(false);

  const refRBSheet = useRef();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const closingMessages = [4,9,13]
  const tutorialMessages = [
    'Welcome to the Ultimate Tic Tac Toe!',
    'Right now you will learn how to play this game. If you already know how to play, you can skip this tutorial at any time.',
    'Let\'s start with the basics. The game is played on a 3x3 grid like normal Tic Tac Toe. ',
    'The difference is that each cell of the grid is another 3x3 grid.',
    'You start on this game so try to make a move. You can tap on any highlighted cell of the grid to make a move.',
    'Good job! As you can see, your symbol was placed on the cell you pressed.',
    'Also, as you can notice, not all of the board is highlighted now, only the small board corresponding to the cell you pressed.',
    'This is the most important rule of the game:',
    'Players must play on the small board corresponding to the cell the opponent played on their last turn.',
    'Now let\'s see what happens this game. Keep going!',
    'When one of the small boards is won by a player, that complete board becomes the symbol of the winner.',
    'The first player to win three small boards in a row, column, or diagonal, wins the game.',
    'If a player is sent to a board that has already been won, they can play on any board.',
    'Now you are ready to play! Have fun!',
  ];

  useEffect(() => {

    const loadAsync = async () => {
      await loadFonts();
      setFontsLoaded(true);
      refRBSheet.current.open();
    };

    loadAsync();

  }, []);
  
  if (!fontsLoaded) {
    return null; // You can render a loading component or return null until the fonts are loaded
  }

  const handleNext = () => {

    if(closingMessages.includes(currentMessageIndex)){
      refRBSheet.current.close();

      if(gameInstance.AISymbol === gameInstance.currentPlayer){
        setTimeout(() => {
          AIMove();
        }, 500); // 500 milliseconds delay as an example
      }
    }

    //Small 0.1 second delay to avoid double tapping
    setTimeout(() => {
      if (currentMessageIndex < tutorialMessages.length - 1) {
        setCurrentMessageIndex(currentMessageIndex + 1);
      } else {
        // If there are no more messages, close the RBSheet
        refRBSheet.current.close();
      }
    }, 300);

    
  };

  const onPressCell = (smallBoardIndex, pos) => {

    let newGameInstance = gameInstance.clone();

    if (newGameInstance.makeMove(smallBoardIndex, pos)) {
      setGame(newGameInstance);
    } else {
      return;
    }
    
    if(newGameInstance.getWinner() !== null){
      setModalVisible(true);
      return;
    }

    if(newGameInstance.moves.length === 1 || gameInstance.winnerBoard.every(val => val === ' ') && !newGameInstance.winnerBoard.every(val => val === ' ')){
      refRBSheet.current.open();
      return;
    }
    
    if(gameInstance.AISymbol !== ' '){
      setTimeout(() => {
        // Trigger AI move after a delay
        AIMove();
      }, 0); // 500 milliseconds delay as an example    
    }
  };

  const AIMove = async () => {
    await new Promise(resolve => setTimeout(resolve, 0));

    setGame(prevGame => {
      const newState = monteCarloTreeSearch(prevGame, 20);
      const newGame = Game.fromState(newState);
      return newGame;
    });
  };


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
      <Text style={{...styles.currentPlayerText, color: gameInstance.currentPlayer === 'X' ? '#007AFF' : '#FF3B30'}}>{gameInstance.currentPlayer} turn</Text>
      <View style={{height: 2, width: '100%', backgroundColor: gameInstance.currentPlayer === 'X' ? '#007AFF' : '#FF3B30', marginBottom: 25}} />
      <BigBoard bigBoard={gameInstance.bigBoard} winnerBoard={gameInstance.winnerBoard} boardOfNextMove={gameInstance.boardOfNextMove} currentPlayer={gameInstance.currentPlayer} onPressCell={onPressCell} AITurn={gameInstance.AITurn}/>

      <RBSheet
        ref={refRBSheet}
        height={200}
        duration={250}
        closeOnDragDown={false}
        closeOnPressMask={false}
        closeOnPressBack={false}
        customStyles={{
          container: {
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
        }}
      >
        <View style={styles.rbSheetContent}>
          <Text style={styles.rbSheetText}>{tutorialMessages[currentMessageIndex]}</Text>
          <View style={styles.rbButtonsContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
              <Text style={styles.rbSheetButton}>{'Skip Tutorial'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext}>
              <Text style={styles.rbSheetButton}>{!closingMessages.includes(currentMessageIndex) ? 'Next' : 'Continue'}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </RBSheet>
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
  rbSheetContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rbButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 40,
  },
  rbSheetText: {
    width: '80%',
    height: '40%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24,
    fontFamily: 'Acme',
  },
  rbSheetButton: {
    fontSize: 16,
    fontFamily: 'Acme',
    color: '#007AFF',
  },
});


export default TutorialScreen;