import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ColorContext } from '../../styles/contexts/ColorContext';
import ColorsPalette from '../../styles/colorsPalettes/ColorsPalette';


const HomeTitleComponent = (props) => {
  const {valueX, valueO} = useContext(ColorContext);

  return (
    <View testID={'HomeScreenTitle'} style={[styles.container]}>
      <Text style={[styles.ultimate, props.styleHeader, props.style]}>ULTIMATE</Text>
      <View style={styles.tictactoe}>
        <Text style={[styles.tic, props.styleHeader, {color : ColorsPalette[valueX]}]}>TIC</Text>
        <Text style={[styles.tac, props.styleHeader, {color : ColorsPalette[valueO]}]}>TAC</Text>
        <Text style={[styles.toe, props.styleHeader, {color : ColorsPalette[valueX]}]}>TOE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  ultimate: {
    fontFamily: 'Acme',
    fontSize: 50,
    alignSelf: 'center',
  },
  tic: {
    fontFamily: 'Acme',
    color: '#007aff',
    fontSize: 50,
    marginRight: 10,
  },
  tac: {
    fontFamily: 'Acme',
    color: 'rgba(250,2,6,1)',
    fontSize: 50,
  },
  toe: {
    fontFamily: 'Acme',
    color: '#007aff',
    fontSize: 50,
    marginLeft: 10,
  },
  tictactoe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeTitleComponent;
