// ReplayScreen.js
import React, {useContext, useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ColorContext } from '../styles/contexts/ColorContext.js';
import ColorsPalette from '../styles/colorsPalettes/ColorsPalette.js';
import ColorsPaletteSoft from '../styles/colorsPalettes/ColorsPaletteSoft.js';
import {useTheme} from '@react-navigation/native';

import BigBoard from '../GamePlayScreen/BigBoard.js';
import Game from '../GameLogic/Game.js';

const ReplayScreen = ({route, navigation}) => {
  const {valueX, valueO} = useContext(ColorContext);
  const [gameInstance, setGame] = useState(Game.fromState(route.params.game));
  const {colors} = useTheme();

  return (
    <SafeAreaView style={styles.container}>
    
      <View style={styles.buttonsView}>

        <TouchableOpacity
          testID='undoButton'
          onPress={() => {
            const newGameInstance = gameInstance.clone();
            newGameInstance.positionOneMoveBack();
            console.log(newGameInstance.currentMove);
            setGame(newGameInstance);
          }}
        >
          <FontAwesome5 name="undo" size={20} color= {colors.text}/>
        </TouchableOpacity>

        <Text style={{...styles.currentPlayerText, color: gameInstance.currentPlayer === 'X' ? ColorsPalette[valueX] : ColorsPalette[valueO]}}>{gameInstance.currentPlayer} turn</Text>

        <TouchableOpacity
          testID='redoButton'
          onPress={() => {
            const newGameInstance = gameInstance.clone();
            newGameInstance.positionOneMoveForward();
            console.log(newGameInstance.currentMove);
            setGame(newGameInstance);
          }}
        >
          <FontAwesome5 name="redo" size={20} color= {colors.text}/>
        </TouchableOpacity>

      </View>

      <View style={{marginBottom: 0, height: 2, width: '100%', backgroundColor: gameInstance.currentPlayer === 'X' ? ColorsPalette[valueX] : ColorsPalette[valueO], marginBottom: 25}} />

      <BigBoard bigBoard={gameInstance.bigBoard} winnerBoard={gameInstance.winnerBoard} boardOfNextMove={gameInstance.boardOfNextMove} currentPlayer={gameInstance.currentPlayer} onPressCell={() => {}} AITurn={gameInstance.AITurn}/>
      
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
