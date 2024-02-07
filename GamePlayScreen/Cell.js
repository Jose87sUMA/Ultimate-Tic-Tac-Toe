// Cell.js
import React, {useContext} from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { ColorContext } from '../styles/contexts/ColorContext';
import ColorsPalette from '../styles/colorsPalettes/ColorsPalette';
import ColorsPaletteSoft from '../styles/colorsPalettes/ColorsPaletteSoft';
import { useTheme } from '@react-navigation/native';

const Cell = (props) => {
  const {valueX, valueO} = useContext(ColorContext);
  const {colors} = useTheme();
  const colorBackground = props.nextMoveHere ? props.currentPlayer === 'X' ? ColorsPaletteSoft[valueX]:ColorsPaletteSoft[valueO]:null;
  const colorBorderAndText = props.value !== ' ' ? props.value === 'X' ? ColorsPalette[valueX]:ColorsPalette[valueO]:colors.text;
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
