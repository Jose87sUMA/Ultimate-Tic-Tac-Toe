// ThemeLogic.js
import {React, useState, useContext, createContext, useEffect} from 'react';
import {useColorScheme, Appearance} from 'react-native';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import NavigationLogic from './NavigationLogic';
import { ThemeContext } from './ThemeContext';
import { ColorContext } from './ColorContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyLightTheme from './styles/MyLightTheme';

const ThemeLogic = () => {

const defaultColorScheme = useColorScheme();
const [theme, setTheme] = useState(defaultColorScheme);
const [color, setColor] = useState('red');
const themeData = { theme, setTheme };
const colorData = { color, setColor };



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
          Appearance.setColorScheme(JSON.parse(value));
        }
      } catch (error) {
        console.error('Error retrieving game from AsyncStorage:', error);
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
