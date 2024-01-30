import {React, useState} from 'react';
import { Switch, SafeAreaView, View, StyleSheet, StatusBar,Image, Text, Button, useColorScheme, AsyncStorage } from 'react-native';



//const colorScheme = useColorScheme();
  //const state = colorScheme === 'dark'? true: false;

const SettingsScreen = () => {
  const defaultMode = false;
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('THEME');
      if (value !== null) {
        defaultMode = value;
      }else{
        
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  
  const [isDarkMode, setisDarkMode] = useState(defaultMode);
  const toggleSwitch = () => setisDarkMode(
    _storeData = async () => {
      try {
        isDarkMode = !isDarkMode;
        await AsyncStorage.setItem(
          'THEME',
          isDarkMode,
        );
      } catch (error) {
        // Error saving data
      }
    }
  );
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

