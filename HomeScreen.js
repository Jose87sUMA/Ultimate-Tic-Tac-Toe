import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, Button } from 'react-native';

import HomeTitle from "../components/HomeTitle";
import CupertinoButtonInfo from "../components/CupertinoButtonInfo";
import CupertinoButtonDanger from "../components/CupertinoButtonDanger";
import CupertinoFooter1 from "../components/CupertinoFooter1";

const HomeScreen = (props) => {
    return (
        <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.homeComponents}>
          <HomeTitle style={styles.homeTitle}></HomeTitle>
          <View style={styles.buttons}>
            <CupertinoButtonInfo
              style={styles.cupertinoButtonInfo}
            ></CupertinoButtonInfo>
            <CupertinoButtonDanger
              style={styles.cupertinoButtonDanger}
            ></CupertinoButtonDanger>
          </View>
          <Image
            source={require("../assets/images/HomeImage_h3Y6..png")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
        </View>
        <View style={styles.homeComponentsFiller}></View>
        <CupertinoFooter1 style={styles.cupertinoFooter1}></CupertinoFooter1>
      </View>
    ); 
};

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    homeComponents: {
      width: 241,
      height: 522,
      marginTop: 105,
      alignSelf: "center"
    },
    homeTitle: {
      height: 97,
      width: 237
    },
    buttons: {
      width: 190,
      height: 128,
      marginTop: 62,
      marginLeft: 24
    },
    cupertinoButtonInfo: {
      height: 44,
      width: 190
    },
    cupertinoButtonDanger: {
      height: 44,
      width: 190,
      marginTop: 40
    },
    image: {
      height: 200,
      width: 200,
      marginTop: 16,
      marginLeft: 19
    },
    homeComponentsFiller: {
      flex: 1
    },
    cupertinoFooter1: {
      height: 49,
      width: 360,
      marginBottom: 31,
      marginLeft: 8
    }
  });


export default HomeScreen;


/*<SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.bigBlue}>Tic Tac Toe</Text>
        
        <Button
          title="Play"
          onPress={() => navigation.navigate('Tic_Tac_Toe')}
        />
        <Button
          title="Tutorial"
          onPress={() => navigation.navigate('Tutorial')}
        />
        <Button
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
        />
        <Button
          title="Statistics"
          onPress={() => navigation.navigate('Statistics')}
        />
        
      </SafeAreaView> 
      
      
const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        alignItems: 'center',
    },
    bigBlue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
        red: {
        color: 'red'
    },
});*/