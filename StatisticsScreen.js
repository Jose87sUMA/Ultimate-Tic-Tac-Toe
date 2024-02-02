import React from 'react';
import {Text, Appearance} from 'react-native';

const StatisticsScreen = () => {
  const name = 'Jose';
  const theme = Appearance.getColorScheme();
  
  this.listener = Appearance.addChangeListener((data) => {
    theme = data;
    alert("change received");
})
  return <Text>Welcome to the Statistics {theme} !</Text>;
};

export default StatisticsScreen;