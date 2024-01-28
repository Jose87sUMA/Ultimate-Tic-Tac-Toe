// App.js
import {React, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SettingsScreen from './SettingsScreen';
import GameplayScreen from './GameplayScreen';
import HomeScreen from './HomeScreen';
import StatisticsScreen from './StatisticsScreen';
import TutorialScreen from './TutorialScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }}/>
         <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }}/>
         <Stack.Screen name="Tic_Tac_Toe" component={GameplayScreen} options={{ title: 'Tic Tac Toe' }}/>
         <Stack.Screen name="Tutorial" component={TutorialScreen} options={{ title: 'Tutorial' }}/>
         <Stack.Screen name="Statistics" component={StatisticsScreen} options={{ title: 'Statistics' }}/>
      </Stack.Navigator>
    </NavigationContainer>
    );

};

export default App;
