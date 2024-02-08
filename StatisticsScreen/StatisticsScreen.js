import React, { useContext, useState, useEffect, useRef } from 'react';
import { Text, View, Button, SafeAreaView, StyleSheet, FlatList, LayoutAnimation, useWindowDimensions } from 'react-native';
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

  const {width} = useWindowDimensions();
  const fontSize = width < 750? 20:40;
  const intermidiateFontSize = width < 750? 25:50;
  const headerFontSize =  width < 750? 50:100;
  const smallSize =  width < 750? 20:30;
  const expandableHeight = width < 750? 100:200;

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
    const winner = item.getWinner();

    return (
      <View
        key={index}
        style={{...styles.statisticsButtonView, }}
      >
       
        <ButtonComponent
          text={winner === ' ' ? "TIE!": winner + ' VICTORY' + ' - ' + item.finishedDate}
          onPress={() => toggleDropdown(index)}
          style={{
            backgroundColor: winner === ' ' ? "gray" : winner === 'X' ? ColorsPalette[valueX] : ColorsPalette[valueO],
            padding: 5,
          }}
          styleText = {{fontSize: smallSize}}
        />
        
        <View
          style={{
            ...styles.expandableContainerView,
            height: isExpanded ? expandableHeight : 0,
            backgroundColor: winner === ' ' ? "gray" : winner === 'X' ? ColorsPalette[valueX] : ColorsPalette[valueO],
            borderColor: colors.border,
          }}
          
        >
         
          {isExpanded && (
              <View
              style={{
                ...styles.expandableView,
                fontSize : fontSize, 
              }}>
                <Text
                  style={{
                    ...styles.numberOfMovesText,
                    fontSize : fontSize,
                  }}
                >
                  {item.moves.length} moves
                </Text>
                 <ButtonComponent
                    style={[{
                      backgroundColor: winner === ' ' ? "gray" : winner === 'X' ? ColorsPalette[valueX] : ColorsPalette[valueO],
                      borderColor: colors.text, 
                      padding: 10
                    }]}
                    text={"Show Replay"}
                    onPress={() => navigation.navigate('ReplayScreen', { game: item })}
                    styleText = {{fontSize: fontSize}}
                />
              </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style = {{flex: 1}}>
      
        <View style={{justifyContent: 'flex-end', height: '15%'}}>
        <Text style={{    
          ...styles.headerTitle, color: colors.text, fontSize: headerFontSize
        }}>
          Statistics
        </Text>
        </View>

        <View style={{...styles.separator}} />
        <View style={{
        ...styles.headerView,
      }}>
        <View
          style={{
            ...styles.victoriesView
          }}
        >
          <Text style={{    
            ...styles.victoriesText,
            color: ColorsPalette[valueX],
            fontSize : intermidiateFontSize,
          }}>
            X VICTORIES: {games.filter((game) => game.getWinner() === 'X').length}
          </Text>

          <Text style={{    
            ...styles.victoriesText,
            color: ColorsPalette[valueO],
            fontSize : intermidiateFontSize,
          }}>
            O VICTORIES: {games.filter((game) => game.getWinner() === 'O').length}
          </Text>
        </View>
        
        <View ><Text style={{color: colors.text, fontWeight: 'bold', fontSize: 20, fontSize : intermidiateFontSize,}}>Previous games</Text></View>
        

      </View>
      
        <View style={{height: '50%', borderColor: colors.text, borderWidth : 1, borderRadius: 5, width :'90%', alignSelf: 'center'}}>
      <FlatList
        data={games}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
      <View style = {{flex: 1, justifyContent : 'flex-end', marginBottom: '5%'}}>
      <ButtonComponent
                  style={[styles.deleteGamesButton,{backgroundColor: theme === 'dark' ? '#767577': '#606060', borderColor: colors.text,}]}
                  text={"Delete all"}
                  onPress={() => {AsyncStorage.removeItem('finishedGames'); setGames([]); alert('You deleted your games.')}}
                  styleText = {{fontSize: fontSize}}
      ></ButtonComponent>
      </View>
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
  },
  headerTitle: {
    fontSize: 50,
    fontFamily: 'Acme',
    alignSelf: 'center'
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
   
    marginTop: 20,
    alignSelf: 'center',
    maxWidth: 400,
    maxHeight: 100,
    width: '30%',

  }
});

export default StatisticsScreen;
