import React, { useContext, useState, useEffect, useRef } from 'react';
import { Text, View, Button, SafeAreaView, StyleSheet, FlatList, LayoutAnimation } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Game from '../GameLogic/Game.js';

import * as Font from 'expo-font';


import { ColorContext } from '../styles/contexts/ColorContext.js';
import ColorsPalette from '../styles/colorsPalettes/ColorsPalette.js';
import ColorsPaletteSoft from '../styles/colorsPalettes/ColorsPaletteSoft.js';
import { useTheme } from '@react-navigation/native';
import ButtonComponent from '../HomeScreen/homeComponents/ButtonComponent.js';
import {ThemeContext} from '../styles/contexts/ThemeContext.js';
const loadFonts = async () => {
  await Font.loadAsync({
    Acme: require('../assets/fonts/Acme.ttf'), 
  });
};

const StatisticsScreen = ({ navigation }) => {
  const [games, setGames] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const {valueX, valueO} = useContext(ColorContext);
  const {theme} = useContext(ThemeContext);
  const {colors} = useTheme();

  useEffect(() => {

    const loadAsync = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadAsync();

  }, []);

  // Function to fetch data and update state
  const fetchDataAndSetState = async () => {
    try {
      const storedGames = await AsyncStorage.getItem('finishedGames');
      const parsedGames = storedGames
        ? JSON.parse(storedGames).map((game) => Game.fromState(game))
        : null;
      setGames(parsedGames || []);
    } catch (error) {
      console.error('Error retrieving games from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    const loadAsync = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadAsync();

    // Fetch data when the component mounts
    fetchDataAndSetState();

    // Listen for changes in the navigation state
    const unsubscribe = navigation.addListener('focus', () => {
      fetchDataAndSetState(); // Fetch data when the screen comes into focus
    });

    // Cleanup listener on component unmount
    return unsubscribe;

  }, [navigation]); 

  if (!fontsLoaded) {
    return null; // You can render a loading component or return null until the fonts are loaded
  }

  const toggleDropdown = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const renderItem = ({ item, index }) => {
    const isExpanded = expandedIndex === index;

    return (
      <SafeAreaView
        key={index}
        style={{...styles.statisticsButtonView, }}
      >
       
        <ButtonComponent
          text={item.getWinner() + ' VICTORY' + ' - ' + item.finishedDate}
          onPress={() => toggleDropdown(index)}
          style={{
            width: '100%',
            backgroundColor :  item.getWinner() === 'X' ? ColorsPalette[valueX] : ColorsPalette[valueO],
            padding: 5

          }}
        />
        
        <View
          style={{
            ...styles.expandableContainerView,
            height: isExpanded ? 100 : 0,
            backgroundColor: item.getWinner() === 'X' ? ColorsPalette[valueX] : ColorsPalette[valueO],
            borderColor: colors.border
          }}
          
        >
         
          {isExpanded && (
              <View
              style={{
                ...styles.expandableView
              }}>
                <Text
                  style={{
                    ...styles.numberOfMovesText,
                  }}
                >
                  {item.moves.length} moves
                </Text>
                 <ButtonComponent
                  style={[{backgroundColor: item.getWinner() === 'X' ? ColorsPalette[valueO] : ColorsPalette[valueX], borderColor: colors.text, width: 150, padding: 10}]}
                  text={"Show Replay"}
                  onPress={() => navigation.navigate('ReplayScreen', { game: item })}
                ></ButtonComponent>
              </View>
          )}
        </View>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView>
      <View style={{
        ...styles.headerView
      }}>
        <Text style={{    
          ...styles.headerTitle, color: colors.text
        }}>
          Statistics
        </Text>

        <View style={{...styles.separator}} />
        <View
          style={{
            ...styles.victoriesView
          }}
        >
          <Text style={{    
            ...styles.victoriesText,
            color: ColorsPalette[valueX],
          }}>
            X VICTORIES: {games.filter((game) => game.getWinner() === 'X').length}
          </Text>

          <Text style={{    
            ...styles.victoriesText,
            color: ColorsPalette[valueO],
          }}>
            O VICTORIES: {games.filter((game) => game.getWinner() === 'O').length}
          </Text>
        </View>
        
        <View ><Text style={{color: colors.text, fontWeight: 'bold', fontSize: 20}}>Previous games</Text></View>
        

      </View>
      
        <View style={{height: '50%'}}>
      <FlatList
        data={games}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
      
      <ButtonComponent
                  style={[styles.deleteGamesButton,{backgroundColor: theme === 'dark' ? '#767577': '#606060', borderColor: colors.text, }]}
                  text={"Delete all"}
                  onPress={() => {AsyncStorage.removeItem('finishedGames')}}
      ></ButtonComponent>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  statisticsButtonView: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
  },
  expandableContainerView: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5 ,
    borderWidth: 2,
    
  },
  expandableView:{
    flexDirection: 'row',   
    height: '100%',    
    width: '100%',             
    justifyContent: 'space-around',
    alignItems: 'center',  
     
  },
  numberOfMovesText: {
    fontSize: 20,
    fontFamily: 'Acme',
    color: 'white',

  },
  headerView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 50,
    fontFamily: 'Acme',
    marginTop: 20,
    marginBottom: 20,
  },
  separator: {
    height: 2, 
    width: '100%',
    backgroundColor: 'gray',
  },
  victoriesView: {
    flexDirection: 'row',   
    width: '100%',             
    justifyContent: 'space-around',
    alignItems: 'center',  
    marginTop: 20,
  },
  victoriesText: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'Acme',
  },
  deleteGamesButton :{
    width: 150, 
    padding: 10,
    marginTop: 20,
    alignSelf: 'center'
  }
});

export default StatisticsScreen;
