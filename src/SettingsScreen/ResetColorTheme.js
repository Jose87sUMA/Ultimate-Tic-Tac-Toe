import {React, useState, useEffect, useContext} from 'react';
import { Switch, SafeAreaView, View, StyleSheet, StatusBar,Image, Text, Button, useWindowDimensions, Appearance, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

import { ThemeContext } from '../styles/contexts/ThemeContext';
import { ColorContext } from '../styles/contexts/ColorContext';

import Sentry from 'sentry-expo';

import ColorsPalette from '../styles/colorsPalettes/ColorsPalette';
import ColorsPaletteSoft from '../styles/colorsPalettes/ColorsPaletteSoft';


const ResetColorTheme = (props) => {
  const {colors} = useTheme();
  
  const { setTheme, theme } = useContext(ThemeContext);
  const{valueO, setValueO, setValueX, valueX} = useContext(ColorContext);
  const defaultColorScheme = Appearance.getColorScheme();
  const {width} = useWindowDimensions();
  const fontSize = width < 750? 10:20;

  const onPressButton = () => {
    setTheme(defaultColorScheme);
    
    setValueX(1);
    setValueO(0);
    _storeData = async () => {
        try {
        await AsyncStorage.setItem(
           'COLORX',
          JSON.stringify(1),
        )
        await AsyncStorage.setItem(
            'COLORO',
            JSON.stringify(0),
        )
        await AsyncStorage.setItem(
            'THEME',
            JSON.stringify(defaultColorScheme),
        )
       } catch (error) {
        Sentry.Native.captureException('Error resetting theme:', error.message);
      }};
    _storeData();
  }

  return (
    <View style={[styles.themeModeContainer, props.styleContainer]}>
      <View style ={styles.themeMode}>
        <Text style={[styles.text, props.styleText]}>Default Settings</Text> 
       
        <TouchableOpacity   style={[styles.button, props.grayButtonStyle]} onPress = {onPressButton}>
            <Text style ={{...styles.buttonText, fontSize: fontSize}}>Revert</Text>
        </TouchableOpacity>
        
      </View>
    </View>

);};

const styles = StyleSheet.create({
  themeModeContainer: {
   alignSelf: 'center',    
   width: '50%',
   backgroundColor: 'gray',
   borderWidth: 4,
   borderRadius: 9,
   
  },
  themeMode: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between' ,
    //borderWidth: 1,
   
  },
  text :{
    //alignSelf: 'center'
  },
  button :{
    backgroundColor: '#606060',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center'
    
   

  },
  buttonText: {
    color: 'white', 
    fontWeight: 'bold',
    alignSelf: 'center',
    
    
  },
});

export default ResetColorTheme;


