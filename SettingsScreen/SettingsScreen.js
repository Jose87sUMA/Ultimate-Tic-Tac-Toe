import {React, useState, useEffect, useContext} from 'react';
import { Switch, SafeAreaView, View, StyleSheet, StatusBar,Image, Text, Button, useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

import { ThemeContext } from '../styles/contexts/ThemeContext';
import { ColorContext } from '../styles/contexts/ColorContext';
import ColorPicker from './ColorPicker';
import ThemePicker from './ThemePicker';
import * as Font from 'expo-font';

import ColorsPalette from '../styles/colorsPalettes/ColorsPalette';
import ColorsPaletteSoft from '../styles/colorsPalettes/ColorsPaletteSoft';

const loadFonts = async () => {
  await Font.loadAsync({
    Acme: require('../assets/fonts/Acme.ttf'), 
  });
};

const SettingsScreen = ({navigation}) => {
  const {colors} = useTheme();
  const { setTheme, theme } = useContext(ThemeContext);
  const{valueO, valueX} = useContext(ColorContext);


  return (
  <View style={styles.container}>
    <SafeAreaView style={{flex : 1}}>
    <View style ={styles.containerInset}>
    <Text style={[styles.headerTitle, {color: colors.text}]}>Settings</Text>

    <View style={{...styles.separator}} />
   
    <ThemePicker></ThemePicker> 
     <View style={styles.separator} />
      <ColorPicker></ColorPicker> 
      <View style={styles.separator} />
    </View>    
    </SafeAreaView>
  </View>

);};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    
    backgroundColor: 'transparent',
    //borderWidth: 4,
    //borderColor: '#e5e7eb',
    borderStyle: 'dashed',

    
  },
  containerInset: {
   // borderWidth: 4,
    //borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    alignSelf: 'center',
    width: '100%'
   
  },
  headerTitle: {
    fontSize: 50,
    fontFamily: 'Acme',
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center'

  },
  separator: {
    height: 2, 
    marginVertical: 10,
    width: '100%',
    backgroundColor: 'gray', 
  },
});

export default SettingsScreen;


//<View style={styles.placeholder}> 
/*<Text style={{color: colors.text}}>Welcome to the settings 
Foto perfil, Cambio de idiomas, modo oscuro/claro, , posibilidad de deshacer movimiento, !</Text>*/