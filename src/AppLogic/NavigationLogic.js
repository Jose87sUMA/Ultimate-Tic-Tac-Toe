// NavigationLogic.js
import {React, useState, useContext} from 'react';
import {useColorScheme, useWindowDimensions} from 'react-native';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SettingsScreen from '../SettingsScreen/SettingsScreen';

import HomeScreen from '../HomeScreen/HomeScreen';
import StatisticsScreen from '../StatisticsScreen/StatisticsScreen';
import RulesScreen from '../RulesScreen';
import TutorialScreen from '../TutorialScreen';
import GamePlayScreen from '../GamePlayScreen/GamePlayScreen';
import ReplayScreen from '../StatisticsScreen/ReplayScreen';

import { ColorContext } from '../styles/contexts/ColorContext';

import { Ionicons } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const NavigationLogic = () => {
  //const scheme = useColorScheme();
  

  return (
      <TabNavigator />
    );

};

const TabNavigator = () => {
  const {valueX, valueO} = useContext(ColorContext);
  const {width} = useWindowDimensions();
  const tabBarHeight = width < 750? 60:120;
  const NavigationTextSize = width < 750? 10:25;
  console.log(width);
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
        } if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
        }
        if (route.name === 'Statistics') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
        }
        if (route.name === 'Rules') {
            iconName = focused ? 'book' : 'book-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: ColorsPalette[valueO],
        tabBarInactiveTintColor:  ColorsPalette[valueX],
        tabBarStyle: { height: tabBarHeight }, // Adjust the height as needed
        labelStyle: { fontSize: 14 },
        headerShown:false,
        tabBarLabelStyle: {fontSize: NavigationTextSize}
        })}>

          <Tab.Screen  name='Home' component={HomeStack} options={{ headerShown: false }}/>
          <Tab.Screen name='Rules' component={RulesScreen}/>
          <Tab.Screen name='Statistics' component={StatisticsStack}/>
          <Tab.Screen name='Settings' component={SettingsScreen}/>
           
        </Tab.Navigator>
         
   )
}

const HomeStack = () => {
   
  return (
    <Stack.Navigator initialRouteName="Game" screenOptions={{ headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Tic_Tac_Toe" component={GamePlayScreen} options={{ title: 'Tic Tac Toe' }}/> 
      <Stack.Screen name="Tutorial" component={TutorialScreen} options={{ title: 'Tutorial' }}/> 
    </Stack.Navigator>
  )
}

const StatisticsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Statistics" screenOptions={{ headerShown: false}}>
      <Stack.Screen name="StatisticsScreen" component={StatisticsScreen} />
      <Stack.Screen name="ReplayScreen" component={ReplayScreen} options={{ title: 'Replay Screen' }}/> 
    </Stack.Navigator>
  )
}



export default NavigationLogic;

     