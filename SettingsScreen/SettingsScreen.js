import {React, useState, useEffect, useContext} from 'react';
import { Switch, SafeAreaView, View, StyleSheet, StatusBar,Image, Text, Button, useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

import { ThemeContext } from '../styles/contexts/ThemeContext';
import { ColorContext } from '../styles/contexts/ColorContext';
import ColorPicker from './ColorPicker';

import ColorsPalette from '../styles/colorsPalettes/ColorsPalette';
import ColorsPaletteSoft from '../styles/colorsPalettes/ColorsPaletteSoft';

const SettingsScreen = ({navigation}) => {
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
  <View style={styles.container}>
    <SafeAreaView style={{flex : 1}}>
    <View style ={styles.containerInset}>

    <View style={styles.separator} />
    <View style={styles.themeModeContainer}>
   
       <Text style={[styles.textLeft, {color: colors.text}]}>Theme</Text> 
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
     <View style={styles.separator} />
      <ColorPicker></ColorPicker> 
      
     
    </View>    
    </SafeAreaView>
  </View>

);};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 24,
    backgroundColor: 'transparent',
    //borderWidth: 4,
    //borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    
  },
  containerInset: {
   // borderWidth: 4,
    //borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
   
  },
  themeModeContainer: {
   flexDirection: "row",
   alignSelf: 'center',    
   justifyContent: 'space-around',
   width: '50%'

  
  },
  themeMode: {
    
   },
  textLeft: {
    //margin: 16
    alignSelf: 'center',
    fontSize: 30
  },
  textRight: {
    //margin: 16
    alignSelf: 'center',
    fontSize: 30,
    marginLeft: 30
    
  },
  separator:{
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb', // Color of the separator
    marginVertical: 10, // Adjust the vertical spacing as needed
  },
});

export default SettingsScreen;


//<View style={styles.placeholder}> 
/*<Text style={{color: colors.text}}>Welcome to the settings 
Foto perfil, Cambio de idiomas, modo oscuro/claro, , posibilidad de deshacer movimiento, !</Text>*/