import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Font from 'expo-font';
import { ColorContext } from '../../ColorContext';
import ColorsPalette from '../../ColorsPalette';

// Function to load custom font
const loadFonts = async () => {
  await Font.loadAsync({
    Acme: require('../../assets/fonts/Acme.ttf'), 
  });
};

function HomeTitleComponent(props) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const {valueX, valueO} = useContext(ColorContext);

  useEffect(() => {
    const loadAsync = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadAsync();
  }, []);

  if (!fontsLoaded) {
    return null; // You can render a loading component or return null until the fonts are loaded
  }

  return (
    <View style={[styles.container]}>
      <Text style={[styles.ultimate, props.style]}>ULTIMATE</Text>

      <View style={styles.tictactoe}>
        <Text style={[styles.tic, {color : ColorsPalette[valueX]}]}>TIC</Text>
        <Text style={[styles.tac, {color : ColorsPalette[valueO]}]}>TAC</Text>
        <Text style={[styles.toe, {color : ColorsPalette[valueX]}]}>TOE</Text>
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
    //color: 'rgba(34,5,5,1)',
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
