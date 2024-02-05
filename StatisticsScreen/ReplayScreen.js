// ReplayScreen.js
import {React, useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import BigBoard from '../GamePlayScreen/BigBoard.js';
import Game from '../GameLogic/Game.js';

import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    Acme: require('../assets/fonts/Acme.ttf'), 
  });
};

const ReplayScreen = ({route, navigation}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [gameInstance, setGame] = useState(Game.fromState(route.params.game));

  useEffect(() => {

    const loadAsync = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadAsync();
  }, []);
  

  if (!fontsLoaded) {
    return null; // You can render a loading component or return null until the fonts are loaded
  }

  return (
    <SafeAreaView style={styles.container}>
    
      <View style={styles.buttonsView}>

        <TouchableOpacity
          onPress={() => {
            const newGameInstance = gameInstance.clone();
            newGameInstance.positionOneMoveBack();
            console.log(newGameInstance.currentMove);
            setGame(newGameInstance);
          }}
        >
          <FontAwesome5 name="undo" size={20} />
        </TouchableOpacity>

        <Text style={{...styles.currentPlayerText, color: gameInstance.currentPlayer === 'X' ? '#007AFF' : '#FF3B30'}}>{gameInstance.currentPlayer} turn</Text>

        <TouchableOpacity
          onPress={() => {
            const newGameInstance = gameInstance.clone();
            newGameInstance.positionOneMoveForward();
            console.log(newGameInstance.currentMove);
            setGame(newGameInstance);
          }}
        >
          <FontAwesome5 name="redo" size={20} />
        </TouchableOpacity>

      </View>

      <View style={{marginBottom: 0, height: 2, width: '100%', backgroundColor: gameInstance.currentPlayer === 'X' ? '#007AFF' : '#FF3B30', marginBottom: 25}} />

      <BigBoard bigBoard={gameInstance.bigBoard} winnerBoard={gameInstance.winnerBoard} boardOfNextMove={gameInstance.boardOfNextMove} currentPlayer={gameInstance.currentPlayer} onPressCell={() => {}} AITurn={gameInstance.AITurn}/>
      
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentPlayerText: {
    fontSize: 24,
    fontFamily: 'Acme',
  },
  buttonsView: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
});

export default ReplayScreen;
