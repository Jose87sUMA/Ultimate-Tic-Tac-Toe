// App.js
import {React, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SettingsScreen from './SettingsScreen';

import HomeScreen from './HomeScreen/HomeScreen';
import StatisticsScreen from './StatisticsScreen';
import TutorialScreen from './TutorialScreen';
import GamePlayScreen from './GamePlayScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen name="Home" component={HomeScreen} />
         <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }}/>
         <Stack.Screen name="Tic_Tac_Toe" component={GamePlayScreen} options={{ title: 'Tic Tac Toe' }}/> 
         <Stack.Screen name="Tutorial" component={TutorialScreen} options={{ title: 'Tutorial' }}/>
         <Stack.Screen name="Statistics" component={StatisticsScreen} options={{ title: 'Statistics' }}/>
      </Stack.Navigator>
    </NavigationContainer>
    );

};

export default App;

