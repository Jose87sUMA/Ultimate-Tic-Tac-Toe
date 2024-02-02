import {React, useContext} from 'react';
import {Text, Appearance, View} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext';
import MyDarkTheme from './styles/MyDarkTheme';
import MyLightTheme from './styles/MyLightTheme';


const StatisticsScreen = () => {
  const name = 'Jose';
   
  //const theme = Appearance.getColorScheme();
  
  const { setTheme, theme } = useContext(ThemeContext);
  //const MyTheme = theme == 'dark'? MyDarkTheme: MyLightTheme;
  const {colors} = useTheme();
  //const themeStyle = theme == 'dark'? MyDarkTheme: MyLightTheme;
  

  
  
  return (
  <View><Text  style={{ color: colors.text}}> Welcome to the Statistics ! _
  {theme} This is the theme"!</Text>
  </View>
  );
};

export default StatisticsScreen;