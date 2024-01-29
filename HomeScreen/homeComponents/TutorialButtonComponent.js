import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function TutorialButtonComponent(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Text style={styles.tutorial}>TUTORIAL</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16,
  },
  tutorial: {
    color: "#fff",
    fontSize: 17
  }
});

export default TutorialButtonComponent;
