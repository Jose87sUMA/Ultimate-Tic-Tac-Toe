import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, SafeAreaView, StyleSheet, FlatList, LayoutAnimation } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Game from './Game.js';

import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    Acme: require('./assets/fonts/Acme.ttf'), 
  });
};

const StatisticsScreen = ({ navigation }) => {
  const [games, setGames] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {

    const loadAsync = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadAsync();

    const fetchData = async () => {
      try {
        const storedGames = await AsyncStorage.getItem('finishedGames');
        const parsedGames = storedGames
          ? JSON.parse(storedGames).map((game) => Game.fromState(game))
          : null;
        setGames(parsedGames || []);
        return parsedGames;
      } catch (error) {
        console.error('Error retrieving games from AsyncStorage:', error);
      }
    };

    fetchData();

  }, []);

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
      <View
        key={index}
        style={{...styles.statisticsButtonView, }}
      >
        <Button
          title={item.getWinner() + ' VICTORY' + ' - ' + item.finishedDate}
          onPress={() => toggleDropdown(index)}
          color= {item.getWinner() === 'X' ? '#007AFF' : '#FF3B30'}
          style={{
            width: '100%',
          }}
        />
        <View
          style={{
            ...styles.expandableContainerView,
            height: isExpanded ? 100 : 0,
            backgroundColor: item.getWinner() === 'X' ? '#B8DAFF' : '#FFAAA6',
          }}
        >
          {isExpanded && (
              <View
              style={{
                ...styles.expandableView,
              }}>
                <Text
                  style={{
                    ...styles.numberOfMovesText,
                  }}
                >
                  {item.moves.length} moves
                </Text>
                <Button
                  title={'Show Replay'}
                  style={{fontFamily: 'Acme', }}
                  onPress={() => navigation.navigate('ReplayScreen', { game: item })}
                  color={'green'}
                />
              </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={{
        ...styles.headerView
      }}>
        <Text style={{    
          ...styles.headerTitle,
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
            color: '#007AFF',
          }}>
            X VICTORIES: {games.filter((game) => game.getWinner() === 'X').length}
          </Text>

          <Text style={{    
            ...styles.victoriesText,
            color: '#FF3B30',
          }}>
            O VICTORIES: {games.filter((game) => game.getWinner() === 'O').length}
          </Text>
        </View>
        
        <View style={{...styles.separator}} />

      </View>
      

      <FlatList
        data={games}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
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
  },
  headerView: {
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default StatisticsScreen;
