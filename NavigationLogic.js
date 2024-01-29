// NavigationLogic.js
import {React, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SettingsScreen from './SettingsScreen';

import HomeScreen from './HomeScreen/HomeScreen';
import StatisticsScreen from './StatisticsScreen';
import RulesScreen from './RulesScreen';
import TutorialScreen from './TutorialScreen';
import GamePlayScreen from './GamePlayScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const NavigationLogic = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
    );

};



const TabNavigator = () => {
  return (
        <Tab.Navigator screenOptions={{ headerShown: false}}>
          <Tab.Screen  name='Home' component={HomeStack} />
          <Tab.Screen name='Rules' component={RulesScreen}/>
          <Tab.Screen name='Statistics' component={StatisticsScreen}/>
          <Tab.Screen name='Settings' component={SettingsScreen}/>
           
        </Tab.Navigator>
   )
}

const HomeStack = () => {
   
  return (
    <Stack.Navigator initialRouteName="Game" screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Tic_Tac_Toe" component={GamePlayScreen} options={{ title: 'Tic Tac Toe' }}/> 
      <Stack.Screen name="Tutorial" component={TutorialScreen} options={{ title: 'Tutorial' }}/> 
       
    </Stack.Navigator>
  )
}



export default NavigationLogic;

/*<Stack.Navigator>
         <Stack.Screen name="Home" component={HomeScreen} />
         <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }}/>
         <Stack.Screen name="Tic_Tac_Toe" component={GamePlayScreen} options={{ title: 'Tic Tac Toe' }}/> 
         <Stack.Screen name="Tutorial" component={TutorialScreen} options={{ title: 'Tutorial' }}/>
         <Stack.Screen name="Statistics" component={StatisticsScreen} options={{ title: 'Statistics' }}/>
      </Stack.Navigator>*/