import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";


function TabComponent(props) {
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity style={styles.btnWrapper1}>
        <EntypoIcon
          name="home"
          style={[
            styles.icon,
            {
              color: props.active ? "#007AFF" : "rgba(0,0,0,1)"
            }
          ]}
        ></EntypoIcon>
        <Text
          style={[
            styles.home,
            {
              color: props.active ? "#007AFF" : "rgba(0,0,0,1)"
            }
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnWrapper2}>
        <MaterialCommunityIconsIcon
          name="book-open-variant"
          style={styles.icon1}
        ></MaterialCommunityIconsIcon>
        <Text style={styles.rules}>Rules</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnWrapper3}>
        <MaterialCommunityIconsIcon
          name="poll"
          style={styles.icon2}
        ></MaterialCommunityIconsIcon>
        <Text style={styles.stats}>Stats</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnWrapper4}>
        <Icon
          name="md-settings"
          style={styles.icon3}
        ></Icon>
        <Text style={styles.settings}>Settings</Text>
        <View style={styles.undefined}></View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
    width: "100%",
    alignSelf: "center"
    
    
    

  },
  btnWrapper1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    backgroundColor: "transparent",
    fontSize: 24,
    opacity: 0.8
  },
  home: {
    fontSize: 12,
    backgroundColor: "transparent",
    paddingTop: 4
  },
  btnWrapper2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  icon1: {
    backgroundColor: "transparent",
    color: "rgba(0,0,0,1)",
    fontSize: 24,
    opacity: 0.8
  },
  rules: {
    fontSize: 12,
    color: "rgba(0,0,0,1)",
    backgroundColor: "transparent",
    paddingTop: 4
  },
  btnWrapper3: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  icon2: {
    backgroundColor: "transparent",
    color: "rgba(0,0,0,1)",
    fontSize: 24,
    opacity: 0.8
  },
  stats: {
    fontSize: 12,
    color: "rgba(0,0,0,1)",
    backgroundColor: "transparent",
    paddingTop: 4
  },
  btnWrapper4: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  icon3: {
    backgroundColor: "transparent",
    color: "rgba(0,0,0,1)",
    fontSize: 24,
    opacity: 0.8
  },
  settings: {
    fontSize: 12,
    color: "rgba(0,0,0,1)",
    backgroundColor: "transparent",
    paddingTop: 4
  },
  undefined: {}
});

export default TabComponent;
