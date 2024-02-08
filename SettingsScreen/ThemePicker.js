import {React, useState, useEffect, useContext} from 'react';
import { Switch, SafeAreaView, View, StyleSheet, StatusBar,Image, Text, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

import { ThemeContext } from '../styles/contexts/ThemeContext';
import { ColorContext } from '../styles/contexts/ColorContext';



import ColorsPalette from '../styles/colorsPalettes/ColorsPalette';
import ColorsPaletteSoft from '../styles/colorsPalettes/ColorsPaletteSoft';


const ThemePicker = (props) => {
  const {colors} = useTheme();
  const { setTheme, theme } = useContext(ThemeContext);
  const{valueO, valueX} = useContext(ColorContext);
  const {width} = useWindowDimensions();
  const fontSize = width < 750? 20:40;


  const toggleSwitch = () => {
    const changedTheme = theme == 'light'? 'dark':'light';
    setTheme(changedTheme);
    _storeData = async () => {
         try {
          await AsyncStorage.setItem(
            'THEME',
            JSON.stringify(changedTheme),
          )
        } catch (error) {
          // Error saving data
        }

    //Appearance.setColorScheme(changedTheme);
    }
    _storeData();

  }

  return (
    <View style={[styles.themeModeContainer, props.styleContainer]}>
      <View style={styles.themeMode}>
       <Text style={[styles.text, props.styleText]}>Theme</Text> 
       
        <Switch trackColor={{false: '#767577', true: '#E8E8E8'}}
          thumbColor={theme == 'dark' ? '#606060' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={theme == 'dark'? true: false}
          style={width < 750?{ transform: [{ scaleX: 1}, { scaleY:   1}] }: { transform: [{ scaleX: 1.5}, { scaleY:   1.5}] }}
          />
      </View>
    </View>

);};

const styles = StyleSheet.create({
  themeModeContainer: {
   alignSelf: 'center',    
   width: '50%',
   backgroundColor: 'gray',
  
  
   
  }, 
  themeMode: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between' ,
   // borderWidth: 1,
   
  },
  text :{
      alignSelf: 'center'
    },
});

export default ThemePicker;


