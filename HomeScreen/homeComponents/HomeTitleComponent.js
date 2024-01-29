import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function HomeTitleComponent(props) {
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
  container: {flexDirection: "column", alignItems: "center"},
  tic: {
  //  fontFamily: "roboto-700",
    color: "#007aff",
    fontSize: 40,
    marginRight: 10
  },
  tac: {
    
    //fontFamily: "roboto-700",
    color: "rgba(250,2,6,1)",
    fontSize: 40,
    
  },
  toe: {
    //  fontFamily: "roboto-700",
    color: "#007aff",
    fontSize: 40,
    marginLeft: 10

  },
  tictactoe: {
    flexDirection: "row",
    alignItems: "center",

  },

  ultimate: {
    //fontFamily: "roboto-700",
    color: "rgba(34,5,5,1)",
    fontSize: 28,
    alignSelf: "center"
    
  }
});

export default HomeTitleComponent;
