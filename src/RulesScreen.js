import React, { useContext  } from 'react';

import { SafeAreaView, View, StyleSheet, StatusBar,Image, Text, Button, ScrollView, useWindowDimensions} from 'react-native';
import { useTheme } from '@react-navigation/native';
import ParsedText from 'react-native-parsed-text';
import { ColorContext } from './styles/contexts/ColorContext';
import ColorsPalette from './styles/colorsPalettes/ColorsPalette';
import ButtonComponent from './HomeScreen/homeComponents/ButtonComponent';

const RulesScreen = ({navigation}) => {
  const {width} = useWindowDimensions();
  const {valueX, valueO}  = useContext(ColorContext);
  const {colors} = useTheme();

  const fontSize = width < 750? 20:40;
  const intermidiateFontSize = width < 600? 25:50;
  const headerFontSize =  width < 600? 50:100;


  const text = `
  Each small 3 × 3 tic-tac-toe board is referred to as a local board, and the larger 3 × 3 board is referred to as the global board.\n
  The game starts with X playing wherever they want in any of the 81 empty spots. This move "sends" their opponent to its relative location.\n
  For example, if X played in the top right square of their local board, then O needs to play next in the local board at the top right of the global board. O can then play in any one of the nine available spots in that local board, each move sending X to a different local board.\n
  If a move is played so that it is to win a local board by the rules of normal tic-tac-toe, then the entire local board is marked as a victory for the player in the global board.\n
  Once a local board is won by a player or it is filled completely, no more moves may be played in that board. If a player is sent to such a board, then that player may play in any other board.\n
  Game play ends when either a player wins the global board or there are no legal moves remaining, in which case the game is a draw.\n
  
  
`;

const paragraphs = text.split('\n').map((paragraph, index) => paragraph.trim()).filter(Boolean);

return (
  <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
    <View style = {{height: '15%', justifyContent: 'flex-end', }}>
    <Text style={[styles.headerTitle, { color: colors.text , fontSize: headerFontSize}]}>Rules</Text>
    </View>
    <View style = {styles.separator}></View>
    <ScrollView style={styles.scroll}>
      {paragraphs.map((paragraph, index) => (
        <ParsedText
          key={index}
          style={[styles.text,  { fontSize: fontSize ,color: colors.text }]}
          parse={[
            { pattern: /\bX\b/, style: { color: ColorsPalette[valueX] } },
            { pattern: /\bO\b/, style: { color: ColorsPalette[valueO] } },
          ]}
        >
          {paragraph}
        </ParsedText>
      ))}
    </ScrollView>
    <View style = {styles.separator}></View>
    <View style = {{height: '25%', justifyContent :'center', flexDirection: 'column'}}>
    <Text style={[styles.tutorialText, {color: ColorsPalette[valueO], fontSize: intermidiateFontSize}]}>Ready to see it in action?</Text>
    <ButtonComponent
          style={[styles.tutorialButton, {backgroundColor: ColorsPalette[valueX]}]}
          text={"TUTORIAL"}
          onPress={() => navigation.navigate('Tutorial')}
          styleText = {{fontSize: fontSize}}
        ></ButtonComponent>
    </View>
  </SafeAreaView>
);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  scroll: {
    flex: 1,
  
  },
  text: {
    marginHorizontal: 30,
    marginTop: "5%", 
    textAlign: 'justify',
    fontWeight: 'bold',

  }, 
  headerTitle: {
    fontSize: 50,
    fontFamily: 'Acme',
    alignSelf : 'center',
    

  },
  tutorialText: {
      alignSelf: 'center',
      fontFamily: 'Acme',
      
  },
  tutorialButton: {
    height: '20%',
    width: '40%',
    maxWidth: 400,
    maxHeight: 100,
    backgroundColor: "#007AFF",
    alignSelf: 'center',
    marginVertical: 20,
    justifyContent: 'center'
   

  },
  separator: {
    height: 2, 
  
    width: '100%',
    backgroundColor: 'gray', 
  },
  
  
});






  

export default RulesScreen;


