// Cell.js
import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';


const Cell = (props) => {
  const colorBackground = props.nextMoveHere ? props.currentPlayer === 'X' ? '#B8DAFF':'#FFAAA6':null;
  const colorBorderAndText = props.value !== ' ' ? props.value === 'X' ? '#007AFF':'#FF3B30':'#000000';
  return (
    <TouchableOpacity style={{...styles.cell, backgroundColor: colorBackground, borderColor: colorBorderAndText}} onPress={props.onPressCell} disabled = {(props.AITurn || props.value !== ' ') && props.nextMoveHere}>
      <Text style={{...styles.cellText, color: colorBorderAndText}}>{props.value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  cellText: {
    fontSize: 24,
  },
});

export default Cell;
