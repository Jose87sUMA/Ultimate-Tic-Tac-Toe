import {React, useState, useEffect, useContext} from 'react';
import { Switch, SafeAreaView, View, StyleSheet, StatusBar,Image, Text, Button, useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

import { ThemeContext } from '../ThemeContext';
import { ColorContext } from '../ColorContext';
import ColorPicker from './ColorPicker';





const SettingsScreen = ({navigation}) => {
  const {colors} = useTheme();
  const { setTheme, theme } = useContext(ThemeContext);
  const {setColorX, colorX} = useContext(ColorContext);

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
      <ColorPicker></ColorPicker>     
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


