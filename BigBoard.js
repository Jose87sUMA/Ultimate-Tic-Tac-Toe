// BigBoard.js
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import SmallBoard from './SmallBoard';

const BigBoard = ({ bigBoard, winnerBoard, boardOfNextMove, onPressCell }) => {
  return (
    <View style={styles.bigBoard}>
      {[0, 1, 2].map((row) => (
        <View key={row} style={styles.rowOfSmallBoards}>
          {[0, 1, 2].map((col) => (
            <SmallBoard
              key={row * 3 + col}
              smallBoard={bigBoard[row * 3 + col]}
              smallBoardIndex={row * 3 + col}
              winnerBoard={winnerBoard}
              nextMoveHere={boardOfNextMove === row * 3 + col || boardOfNextMove === -1}
              onPressCell={onPressCell}
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
    width: '75%',
  },
  rowOfSmallBoards: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: isTablet ? '20%' : '15%', // Adjust the maxHeight based on the device type
  },
});


export default BigBoard;
