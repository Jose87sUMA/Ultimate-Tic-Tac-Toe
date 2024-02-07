// ThemeLogic.js
import {React, useState, useContext, createContext, useEffect} from 'react';
import {useColorScheme, Appearance} from 'react-native';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import NavigationLogic from './NavigationLogic';
import { ThemeContext } from '../styles/contexts/ThemeContext';
import { ColorContext } from '../styles/contexts/ColorContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyLightTheme from '../styles/themes/MyLightTheme';

import Sentry from 'sentry-expo';

const ThemeLogic = () => {

const [valueX, setValueX] = useState(1);
const [valueO, setValueO] = useState(0);
useEffect(() => {
  const getColorFromStorage = async () => {
    try {
      const valueX = await AsyncStorage.getItem('COLORX'); 
      const valueO = await AsyncStorage.getItem('COLORO'); 
      if (valueX !== null ) {
        setValueX(JSON.parse(valueX));
       
          
      }
      if (valueO !== null ){
          setValueO(JSON.parse(valueO));
          
      }
    } catch (error) {
      console.error('Error retrieving game from AsyncStorage:', error);
      Sentry.captureException('Error retrieving game from AsyncStorage:', error);
    }
  };

  getColorFromStorage();
}, []);

const colorData = { valueX, setValueX, valueO, setValueO };

const defaultColorScheme = useColorScheme() === 'dark'? 'dark': 'light';
const [theme, setTheme] = useState(defaultColorScheme);
const themeData = { theme, setTheme };

if (defaultColorScheme === 'dark') {
    console.log('dark');
}else{
    console.log('light');
}
useEffect(() => {
    const getThemeFromStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('THEME'); 
        if (value !== null) {
          setTheme(JSON.parse(value));
          //Appearance.setColorScheme(JSON.parse(value));
        }
      } catch (error) {
        console.error('Error retrieving game from AsyncStorage:', error);
        Sentry.captureException('Error retrieving game from AsyncStorage:', error);
      }
    };
  
    getThemeFromStorage();
}, []);


 
  return (
   
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : MyLightTheme}>
      <ThemeContext.Provider value={themeData}>
        <ColorContext.Provider value={colorData}>
          <NavigationLogic/>
        </ColorContext.Provider>
      </ThemeContext.Provider>
    </NavigationContainer>
    
    );

};

export default ThemeLogic;
