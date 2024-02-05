import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function ButtonComponent(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
      <Text style={styles.text}>{props.text }</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16,
  },
  text: {
    color: "#fff",
    fontSize: 17
  }
});

export default ButtonComponent;
