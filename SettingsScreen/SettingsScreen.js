import {React, useState, useEffect, useContext} from 'react';
import { Switch, SafeAreaView, View, StyleSheet, StatusBar,Image, Text, Button, useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

import { ThemeContext } from '../ThemeContext';
import ColorPicker from './ColorPicker';





const SettingsScreen = ({navigation}) => {
  const {colors} = useTheme();
  const { setTheme, theme } = useContext(ThemeContext);

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
  <SafeAreaView style={styles.container}>
    <Text style={{color: colors.text}}>Welcome to the settings 
    Foto perfil, Cambio de idiomas, modo oscuro/claro, , posibilidad de deshacer movimiento, !</Text>
    <View style={styles.themeMode}>
       <Text style={[styles.text, {color: colors.text}]}>Theme</Text> 
       <Switch trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={theme == 'dark' ? "#007AFF" : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={theme == 'dark'? true: false}/>
        <Text style={[styles.text, {color: colors.text}]}> Theme: {theme}</Text>
     </View>
  </SafeAreaView>

);};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  themeMode: {
   flexDirection: "row",
   

  },
  text: {
    margin: 16
  }
});

export default SettingsScreen;






































//const colorScheme = useColorScheme();
  //const state = colorScheme === 'dark'? true: false;

/*const SettingsScreen = () => {
  const colorScheme = useColorScheme();
  const defaultTheme = colorScheme === 'dark'? true: false;

  const [isDarkMode, setisDarkMode] = useState(defaultTheme);

  if (colorScheme === 'dark') {
    console.log('dark');
  }else{
    console.log('light');
  }
  useEffect(() => {
    const getThemeFromStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('THEME'); 
        if (value !== null) {
          const iniTheme = JSON.parse(value)? 'dark' : 'light'
          setisDarkMode(JSON.parse(value));
          console.log('Theme ' + value);
          Appearance.setColorScheme('dark');
          console.log("Initial theme " + iniTheme);
          const help = Appearance.getColorScheme();
          console.log("Actual initial theme " + help);
          
        }else{
            const iniTheme = defaultTheme? 'dark' : 'light';
            Appearance.setColorScheme('dark');
            
        }
        
      } catch (error) {
        console.error('Error retrieving game from AsyncStorage:', error);
      }
    };
  
    getThemeFromStorage();
  
  }, []);
  
  
  
  const toggleSwitch = () => {
    //console.log("Theme before toggle: " + isDarkMode);
    const currentTheme = !isDarkMode;
    setisDarkMode(currentTheme);
    _storeData = async () => {
         try {
          await AsyncStorage.setItem(
            'THEME',
            JSON.stringify(currentTheme),
          )
        } catch (error) {
          // Error saving data
        }
      const theme = currentTheme? 'dark' : 'light';
      Appearance.setColorScheme(theme);
      alert("Entered " + theme + " mode");
      const help = Appearance.getColorScheme();
      console.log("Actual initial theme " + help);
    }
    _storeData();
   // AsyncStorage.setItem('THEME', JSON.stringify(!currentTheme));

  }
  return (
  <SafeAreaView style={styles.container}>
    <Text>Welcome to the settings 
    Foto perfil, Cambio de idiomas, modo oscuro/claro, , posibilidad de deshacer movimiento, !</Text>
    <View style={styles.themeMode}>
       <Text style={styles.text}>Theme</Text> 
       <Switch trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isDarkMode}/>
        <Text style={styles.text}>{isDarkMode? 'Dark' : 'Light'}</Text>
     </View>
  </SafeAreaView>

);};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  themeMode: {
   flexDirection: "row",
   

  },
  text: {
    margin: 16
  }
});

export default SettingsScreen;*/


