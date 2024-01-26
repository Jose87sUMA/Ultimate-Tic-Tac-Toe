// Cell.js
import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const Cell = (props) => {
  return (
    <TouchableOpacity style={[styles.cell, props.nextMoveHere ? styles.cellAvailable : null]} onPress={props.onPressCell} disabled = {props.AITurn}>
      <Text style={styles.cellText}>{props.value}</Text>
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
    borderRadius: 10, // Set border radius to create round corners
    overflow: 'hidden', // Clip the content inside the rounded border
  },
  cellText: {
    fontSize: 24,
  },
  cellAvailable: {
    backgroundColor: 'yellow',
  },
});

export default Cell;
