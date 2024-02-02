import {React, useState, useEffect} from 'react';
import {Text, View, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Game from './Game.js';

const StatisticsScreen = ({navigation}) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedGames = await AsyncStorage.getItem('finishedGames');
        const parsedGames = storedGames ? JSON.parse(storedGames).map(game => Game.fromState(game)) : null;
        setGames(parsedGames || []);
        console.log(parsedGames[1].currentMove);
      } catch (error) {
        console.error('Error retrieving games from AsyncStorage:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <View>
      <Text>Statistics Screen</Text>
      <View>
        {games.map((game, index) => (
          <Button
            key={index}
            title={'game ' + index}
            onPress={() => navigation.navigate('ReplayScreen', {game: game})}
          />
        ))}
      </View>
    </View>
  );
};

export default StatisticsScreen;