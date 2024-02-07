import {React, useState, useEffect, useContext} from 'react';
import { Switch, SafeAreaView, View, StyleSheet, StatusBar,Image, Text, Button, useColorScheme, Appearance, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

import { ThemeContext } from '../styles/contexts/ThemeContext';
import { ColorContext } from '../styles/contexts/ColorContext';



import ColorsPalette from '../styles/colorsPalettes/ColorsPalette';
import ColorsPaletteSoft from '../styles/colorsPalettes/ColorsPaletteSoft';


const ResetColorTheme = (props) => {
  const {colors} = useTheme();
  
  const { setTheme, theme } = useContext(ThemeContext);
  const{valueO, setValueO, setValueX, valueX} = useContext(ColorContext);
  const defaultColorScheme = Appearance.getColorScheme();
  console.log('This is it ' + defaultColorScheme);

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
         // Error saving data
       }};
    _storeData();
  }

  return (
    <View style={[styles.themeModeContainer, props.styleContainer]}>
      <View style ={styles.themeMode}>
        <Text style={[styles.text, props.styleText]}>Default Settings</Text> 
       
        <TouchableOpacity  style={[styles.button, {backgroundColor: theme === 'dark' ? '#767577': '#606060', justifyContent: 'center'}]} onPress = {onPressButton}>
            <Text style ={styles.buttonText}>Revert</Text>
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
    
   

  },
  buttonText: {
    color: 'white', 
    fontWeight: 'bold',
    alignSelf: 'center',
    
    
  },
});

export default ResetColorTheme;


