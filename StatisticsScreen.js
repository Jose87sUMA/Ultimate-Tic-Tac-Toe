import {React, useContext} from 'react';
import {Text, Appearance, View} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext';
import MyDarkTheme from './styles/MyDarkTheme';
import MyLightTheme from './styles/MyLightTheme';


const StatisticsScreen = () => {
  const name = 'Jose';
  const {colors} = useTheme();
 

  return (
  <View><Text  style={{ color: colors.text}}> Welcome to the Statistics ! _
      This is the theme"!</Text>
  </View>
  );
};

export default StatisticsScreen;