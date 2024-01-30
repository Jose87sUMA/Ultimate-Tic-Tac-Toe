import {React, useState, useEffect} from 'react';
import { Switch, SafeAreaView, View, StyleSheet, StatusBar,Image, Text, Button, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


//const colorScheme = useColorScheme();
  //const state = colorScheme === 'dark'? true: false;

const SettingsScreen = () => {
  const colorScheme = useColorScheme();
  const defaultTheme = colorScheme === 'dark'? true: false;

  const [isDarkMode, setisDarkMode] = useState(defaultTheme);
  
  useEffect(() => {
    const getThemeFromStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('THEME'); 
        if (value !== null) {
          setisDarkMode(JSON.parse(value));
          console.log('Theme ' + value);
        }else{
  
        }
        
      } catch (error) {
        console.error('Error retrieving game from AsyncStorage:', error);
      }
    };
  
    getThemeFromStorage();
  
  }, []);
  
  
  const toggleSwitch = () => {
    console.log("Theme before toggle: " + isDarkMode);
    const currentTheme = isDarkMode;
    setisDarkMode(!isDarkMode);
    _storeData = async () => {
         try {
          await AsyncStorage.setItem(
            'THEME',
            JSON.stringify(!currentTheme),
          )
        } catch (error) {
          // Error saving data
        }
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

export default SettingsScreen;
export const isDarkMode;

