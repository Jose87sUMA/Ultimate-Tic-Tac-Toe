// SmallBoard.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';

const SmallBoard = ({ smallBoard, smallBoardIndex, winnerBoard, nextMoveHere, onPressCell }) => {
  return (
    winnerBoard[smallBoardIndex] === ' ' ?
    <View style={styles.smallBoard}>
      {[0, 1, 2].map((row) => (
        <View key={row} style={styles.rowOfCells}>
          {[0, 1, 2].map((col) => (
            <Cell
              key={row * 3 + col}
              value={smallBoard[row * 3 + col]}
              nextMoveHere={nextMoveHere}
              onPressCell={() => onPressCell(smallBoardIndex, row * 3 + col)}
            />
          ))}
        </View>
      ))}
    </View>:
    <View style={styles.finishedCell}>
        <Cell
        key={smallBoardIndex}
        value={winnerBoard[smallBoardIndex]}
        nextMoveHere={false}
        onPressCell={null}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  smallBoard: {
    aspectRatio: 1,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rowOfCells: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',

  },
  finishedCell: {
    flex: 1,
    height: '90%',
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default SmallBoard;
