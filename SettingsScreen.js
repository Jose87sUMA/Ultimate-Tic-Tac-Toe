import React from 'react';
import {Text} from 'react-native';
import TabComponent from "./HomeScreen/homeComponents/TabComponent";

const SettingsScreen = () => {
  const name = 'Jose';
  return <Text>Welcome to the settings {name}     <TabComponent></TabComponent> !</Text>;
};

export default SettingsScreen;

