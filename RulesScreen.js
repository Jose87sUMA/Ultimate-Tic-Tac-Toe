import React, { useContext } from 'react';

import { SafeAreaView, View, StyleSheet, StatusBar,Image, Text, Button, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import ParsedText from 'react-native-parsed-text';
import { ColorContext } from './styles/contexts/ColorContext';
import ColorsPalette from './styles/colorsPalettes/ColorsPalette';
import ButtonComponent from './HomeScreen/homeComponents/ButtonComponent';
import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    Acme: require('./assets/fonts/Acme.ttf'), 
  });
};

const RulesScreen = ({navigation}) => {
  const text = `
  Each small 3 × 3 tic-tac-toe board is referred to as a local board, and the larger 3 × 3 board is referred to as the global board.\n
  The game starts with X playing wherever they want in any of the 81 empty spots. This move "sends" their opponent to its relative location.\n
  For example, if X played in the top right square of their local board, then O needs to play next in the local board at the top right of the global board. O can then play in any one of the nine available spots in that local board, each move sending X to a different local board.\n
  If a move is played so that it is to win a local board by the rules of normal tic-tac-toe, then the entire local board is marked as a victory for the player in the global board.\n
  Once a local board is won by a player or it is filled completely, no more moves may be played in that board. If a player is sent to such a board, then that player may play in any other board.\n
  Game play ends when either a player wins the global board or there are no legal moves remaining, in which case the game is a draw.\n
  
  
`;

const paragraphs = text.split('\n').map((paragraph, index) => paragraph.trim()).filter(Boolean);
const {valueX, valueO}  = useContext(ColorContext);
const {colors} = useTheme();

return (
  <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
    <Text style={[styles.headerTitle, { color: colors.text }]}>Rules</Text>
    <View style = {styles.separator}></View>
    <ScrollView style={styles.scroll}>
      {paragraphs.map((paragraph, index) => (
        <ParsedText
          key={index}
          style={[styles.text, { color: colors.text }]}
          parse={[
            { pattern: /\bX\b/, style: { color: ColorsPalette[valueX] } },
            { pattern: /\bO\b/, style: { color: ColorsPalette[valueO] } },
          ]}
        >
          {paragraph}
        </ParsedText>
      ))}
      <Text style={[styles.tutorialText,{color: ColorsPalette[valueO]}]}>Ready to see it in action?</Text>
       <ButtonComponent
          style={[styles.tutorialButton, {backgroundColor: ColorsPalette[valueX]}]}
          text={"TUTORIAL"}
          onPress={() => navigation.navigate('Tutorial')}
        ></ButtonComponent>
    </ScrollView>
  </SafeAreaView>
);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  
  },
  text: {
    marginHorizontal: 30,
    fontSize: 19,
    marginTop: "5%", 
    textAlign: 'justify',
    fontWeight: 'bold',

  }, 
  headerTitle: {
    fontSize: 50,
    fontFamily: 'Acme',
    marginTop: 20,
    marginBottom: 20,
    alignSelf : 'center'

  },
  tutorialText: {
      alignSelf: 'center',
      fontWeight: 'bold',
      marginTop: 30,
      fontSize: 20,
  },
  tutorialButton: {
    height: 44,
    width: 190,
    backgroundColor: "#007AFF",
    alignSelf: 'center',
    marginVertical: 20,
   

  },
  separator: {
    height: 2, 
  
    width: '100%',
    backgroundColor: 'gray', 
  },
  
  
});






  

export default RulesScreen;

/*  const {colors} = useTheme();
  const {valueX, valueO}  = useContext(ColorContext);
  return (
  <SafeAreaView style={[styles.container, {backgroundColor : colors.background}]}>
    <Text style={[styles.headerTitle, {color: colors.text}]}>Rules</Text>
    <ScrollView style ={styles.scroll}>
    <ParsedText 
      style={[styles.text, {color: colors.text}]}
      parse={
        [
        {pattern: /\bX\b/, style: {color: ColorsPalette[valueX], fontWeight: 'bold'}},
        {pattern: /\bO\b/, style: {color: ColorsPalette[valueO], fontWeight: 'bold'}},
        ]
      }
    >
      Each small 3 × 3 tic-tac-toe board is referred to as a local board, and the larger 3 × 3 board is referred to as the global board.
      
      The game starts with X playing wherever they want in any of the 81 empty spots. 
      This move "sends" their opponent to its relative location. 
      
      For example, if X played in the top right square of their local board, then O needs to play next in the local board at the top right 
      of the global board. O can then play in any one of the nine available spots in that local board, each move sending X to a different local board.
      
      If a move is played so that it is to win a local board by the rules of normal tic-tac-toe, then the entire local board is marked as a victory for the player in the global board.
      
      Once a local board is won by a player or it is filled completely, no more moves may be played in that board. If a player is sent to such a board, then that player may play in any other board.
      
      Game play ends when either a player wins the global board or there are no legal moves remaining, in which case the game is a draw.
  </ParsedText>
  </ScrollView>
  </SafeAreaView> */