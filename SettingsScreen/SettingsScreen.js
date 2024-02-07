import React, {useState, useEffect, useContext} from 'react';
import { Switch, SafeAreaView, View, StyleSheet, StatusBar,Image, Text, Button, useColorScheme, Appearance, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

import { ThemeContext } from '../styles/contexts/ThemeContext';
import { ColorContext } from '../styles/contexts/ColorContext';
import ColorPicker from './ColorPicker';
import ThemePicker from './ThemePicker';
import ResetColorTheme from './ResetColorTheme';
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

  const {height, width, scale, fontScale} = useWindowDimensions();
  const bigWidth = width >= 600;
  return (
  
  <SafeAreaView style={{flex : 1}}>
    <View style={{height : '15%', justifyContent: 'flex-end', alignContent: 'center'}}>
      <Text style={[styles.headerTitle, {color: colors.text}]}>Settings</Text>
    </View>
    <View style={{...styles.separator}} />
    <View style ={styles.containerInset}>
      <ThemePicker styleText = {{...styles.textOptions, color: colors.text}} styleContainer = {{...styles.boxOptions, backgroundColor: colors.border}}></ThemePicker> 
      <ColorPicker styleText = {{...styles.textOptions, color: colors.text}} styleContainer= {{...styles.boxOptions, backgroundColor: colors.border}} bi></ColorPicker> 
      <ResetColorTheme styleText = {{...styles.textOptions, color: colors.text}} styleContainer= {{...styles.boxOptions, backgroundColor: colors.border}}></ResetColorTheme> 
     
    </View>    
  </SafeAreaView>


);};

const styles = StyleSheet.create({
  containerInset: {
    //borderWidth: 4,
    //borderColor: '#e5e7eb',
    //borderStyle: 'dashed',
    //borderRadius: 9,
    height: '85%',
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center'
    
   
  },
  headerTitle: {
    fontSize: 50,
    fontFamily: 'Acme',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  separator: {
    height: 2, 
    width: '100%',
    backgroundColor: 'gray', 
  },
  textOptions:{
    
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: '3%',
    borderColor: 'black',
    fontFamily: 'Acme',
    
    
  },
  boxOptions:{
    width: '75%',
    borderWidth: 0,
    margin: 5,
    paddingVertical: '5%',
    backgroundColor: '#B8DAFF'
    
  },
});

export default SettingsScreen;


