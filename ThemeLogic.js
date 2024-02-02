// ThemeLogic.js
import {React, useState, useContext, createContext, useEffect} from 'react';
import {useColorScheme, Appearance} from 'react-native';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import NavigationLogic from './NavigationLogic';
import { ThemeContext } from './ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import lightTheme from './styles/MyLightTheme';
import darkTheme from './styles/MyLightTheme';
import MyDarkTheme from './styles/MyDarkTheme';
import MyLightTheme from './styles/MyLightTheme';

const ThemeLogic = () => {

const defaultColorScheme = useColorScheme();
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
          console.log('Theme potato ' + value);
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
        <NavigationLogic/>
      </ThemeContext.Provider>
    </NavigationContainer>
    
    );

};

export default ThemeLogic;
