// SmallBoard.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';

const SmallBoard = (props) => {
  return (
    props.winnerBoard[props.smallBoardIndex] === ' ' ?
    <View style={styles.smallBoard}>
      {[0, 1, 2].map((row) => (
        <View key={row} style={styles.rowOfCells}>
          {[0, 1, 2].map((col) => (
            <Cell
              key={row * 3 + col}
              value={props.smallBoard[row * 3 + col]}
              nextMoveHere={props.nextMoveHere}
              currentPlayer={props.currentPlayer}
              onPressCell={() => props.onPressCell(props.smallBoardIndex, row * 3 + col)}
              AITurn={props.AITurn}
            />
          ))}
        </View>
      ))}
    </View>:
    <View style={styles.finishedCell}>
        <Cell
          key={props.smallBoardIndex}
          value={props.winnerBoard[props.smallBoardIndex]}
          nextMoveHere={false}
          currentPlayer={props.currentPlayer}
          onPressCell={null}
          AITurn={props.AITurn}
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
