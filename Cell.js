// Cell.js
import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const Cell = ({ value, nextMoveHere, onPressCell }) => {
  return (
    <TouchableOpacity style={[styles.cell, nextMoveHere ? styles.cellAvailable : null]} onPress={onPressCell}>
      <Text style={styles.cellText}>{value}</Text>
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
