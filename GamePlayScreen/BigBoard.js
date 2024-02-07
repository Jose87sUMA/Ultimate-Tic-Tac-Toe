// BigBoard.js
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import SmallBoard from './SmallBoard';

const BigBoard = (props) => {
  return (
    <View style={styles.bigBoard}>
      {[0, 1, 2].map((row) => (
        <View key={row} style={styles.rowOfSmallBoards}>
          {[0, 1, 2].map((col) => (
            <SmallBoard
              key={row * 3 + col}
              smallBoard={props.bigBoard[row * 3 + col]}
              smallBoardIndex={row * 3 + col}
              winnerBoard={props.winnerBoard}
              nextMoveHere={props.boardOfNextMove === row * 3 + col || props.boardOfNextMove === -1}
              currentPlayer={props.currentPlayer}
              onPressCell={props.onPressCell}
              AITurn={props.AITurn}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const { width, height } = Dimensions.get('window');
console.log('width: ' + width + ' height: ' + height);
const isTablet = width >= 500;
console.log(isTablet);

const styles = StyleSheet.create({
  bigBoard: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    marginTop: 20,
    
   
  },
  rowOfSmallBoards: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: '15%',
    height: '30%', 
    margin: '10%'


  },
});


export default BigBoard;
