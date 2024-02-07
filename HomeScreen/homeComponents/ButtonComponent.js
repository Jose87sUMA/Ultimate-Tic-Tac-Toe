import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function ButtonComponent(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
      <Text style={[styles.text, props.styleText]}>{props.text }</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
 
    borderWidth: 1,
    
  },
  text: {
    color: "#fff",
    fontSize: 17,
    fontWeight: 'bold'
  }
});

export default ButtonComponent;
