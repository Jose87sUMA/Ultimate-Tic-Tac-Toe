import React from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar,Image, Text, Button } from 'react-native';

import HomeTitleComponent from "./homeComponents/HomeTitleComponent";
import PlayButtonComponent from "./homeComponents/PlayButtonComponent";
import TutorialButtonComponent from "./homeComponents/TutorialButtonComponent";
import TabComponent from "./homeComponents/TabComponent";

const HomeScreen = () => {
    return (

  
  <SafeAreaView style={styles.container}>
        <View style={styles.homeComponents}>
          <HomeTitleComponent style={styles.HomeTitleComponent}></HomeTitleComponent>
          <View style={styles.buttons}>
            <PlayButtonComponent
              style={styles.playButtonComponent}
            ></PlayButtonComponent>
            <TutorialButtonComponent
              style={styles.tutorialButtonComponent}
            ></TutorialButtonComponent>
          </View>
          <Image
            source={require("../assets/images/HomeImage.png")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
          <TabComponent style={styles.tabComponent}></TabComponent> 
        </View>
        <View style={styles.homeComponentsFiller}></View>
        
      </SafeAreaView>  


     
    ); 
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white"
      
    },
    homeComponents: {
      width: 241,
      height: 522,
      marginTop: 105,
      alignSelf: "center"
    },
    HomeTitleComponent: {
     
    },
    buttons: {
      alignSelf: "center",
      marginTop: 40
    },
    playButtonComponent: {
      height: 44,
      width: 190
    },
    tutorialButtonComponent: {
      height: 44,
      width: 190,
      marginTop: 40
    },
    image: {
      height: 200,
      width: 200,
      marginTop: 20,
      alignSelf: "center"
    },
    homeComponentsFiller: {
      flex: 1
    },
    tabComponent: {
      width: 350,

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
