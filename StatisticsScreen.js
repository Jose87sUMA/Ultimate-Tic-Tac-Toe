import {React, useContext} from 'react';
import {Text, Appearance} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext';
const StatisticsScreen = () => {
  const name = 'Jose';
 // const { dark, colors } = useTheme();
  //const theme = Appearance.getColorScheme();

  const { setTheme, theme } = useContext(ThemeContext);
  
  this.listener = Appearance.addChangeListener((data) => {
    theme = data;
    alert("change received");
})
  return <Text> Welcome to the Statistics ! _
  {theme} This is the theme"!</Text>;
};

export default StatisticsScreen;