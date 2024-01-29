import {React,useEffect, useState} from 'react';
import { StyleSheet, View, Text } from "react-native";

import * as Font from 'expo-font';

function HomeTitleComponent(props) {
  /*state={
    isReady: false
  }
  useEffect(() => {
    // Load custom font asynchronously
    const loadFonts = async () => {
      await Font.loadAsync({
        'ArchivoBlack Regular': require('../../assets/fonts/ArchivoBlack Regular.ttf'),
        // Add more fonts if needed
      });
      this.setState({isReady:true})
    };

    loadFonts(); }, []);*/
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.ultimate}>ULTIMATE</Text>

      <View style={styles.tictactoe}>
        <Text style={styles.tic}>TIC</Text>
        <Text style={styles.tac}>TAC</Text>
        <Text style={styles.toe}>TOE</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: "column", alignItems: "center",},
  tic: {
  //  fontFamily: "roboto-700",
    color: "#007aff",
    fontSize: 50,
    marginRight: 10,
    fontWeight: "bold"
  },
  tac: {
    //fontFamily: 'ArchivoBlack Regular',
    //fontFamily: "roboto-700",
    color: "rgba(250,2,6,1)",
    fontSize: 50,
    fontWeight: "bold"
    
  },
  toe: {
    //  fontFamily: "roboto-700",
    color: "#007aff",
    fontSize: 50,
    marginLeft: 10,
    fontWeight: "bold"
    

  },
  tictactoe: {
    flexDirection: "row",
    alignItems: "center",
    

  },

  ultimate: {
    //fontFamily: "roboto-700",
    color: "rgba(34,5,5,1)",
    fontSize: 28,
    alignSelf: "center",
    fontWeight: "bold"
    
  }
});

export default HomeTitleComponent;
