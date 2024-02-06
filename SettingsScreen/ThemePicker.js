import {React, useState, useEffect, useContext} from 'react';
import { Switch, SafeAreaView, View, StyleSheet, StatusBar,Image, Text, Button, useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

import { ThemeContext } from '../styles/contexts/ThemeContext';
import { ColorContext } from '../styles/contexts/ColorContext';



import ColorsPalette from '../styles/colorsPalettes/ColorsPalette';
import ColorsPaletteSoft from '../styles/colorsPalettes/ColorsPaletteSoft';


const ThemePicker = ({navigation}) => {
  const {colors} = useTheme();
  const { setTheme, theme } = useContext(ThemeContext);
  const{valueO, valueX} = useContext(ColorContext);


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

    Appearance.setColorScheme(changedTheme);
    }
    _storeData();

  }

  return (
    <View style={styles.themeModeContainer}>
       <Text style={[styles.text, {color: colors.text}]}>Theme</Text> 
       <View style={styles.themeMode}>
        <Switch trackColor={{false: '#767577', true: ColorsPaletteSoft[valueO]}}
          thumbColor={theme == 'dark' ? ColorsPaletteSoft[valueX] : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={theme == 'dark'? true: false}
          style={{ transform: [{ scaleX: 1.5 }, { scaleY:   1.5}] }}
          />
        </View>
    </View>

);};

const styles = StyleSheet.create({
  themeModeContainer: {
   flexDirection: "row",
   alignSelf: 'center',    
   justifyContent: 'space-around',
   width: '50%'
  },
  text :{

    alignSelf: 'center',
    fontSize: 30
},
});

export default ThemePicker;


