import React from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar,Image, Text, Button} from 'react-native';

import HomeTitleComponent from "./homeComponents/HomeTitleComponent";
import ButtonComponent from "./homeComponents/ButtonComponent";

const HomeScreen = ({navigation}) => {

  return (
    <SafeAreaView style={styles.container}>
        
      <HomeTitleComponent style={styles.HomeTitleComponent}></HomeTitleComponent>
      <View style={styles.buttons}>
        <ButtonComponent
          style={styles.sideButton}
          text={"NEW GAME"}
          onPress={() => navigation.navigate('Tic_Tac_Toe', {continuingGame: false, AIMove: 'O'})}
        ></ButtonComponent>
        <ButtonComponent
          style={styles.middleButton}
          text={"CONTINUE"}
          onPress={() => navigation.navigate('Tic_Tac_Toe', {continuingGame: true})}
        ></ButtonComponent>
        <ButtonComponent
          style={styles.sideButton}
          text={"TUTORIAL"}
          onPress={() => navigation.navigate('Tutorial')}
        ></ButtonComponent>
      </View>
      <Image
        source={require("../assets/images/HomeImage.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
    
      <View style={styles.homeComponentsFiller}></View>
          
    </SafeAreaView>  

  ); 
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      
      
    },
    homeComponents: {
      width: 241,
      height: 522,
      marginTop: 105,
      alignSelf: "center",
     
    },
    HomeTitleComponent: {
      marginTop: "30%"
      
    },
    buttons: {
      flexDirection: "column",
      alignSelf: "center",
      marginTop: "20%"
      
    },
    sideButton: {
      height: 44,
      width: 190,
      backgroundColor: "#007AFF",
    },
    middleButton: {
      height: 44,
      width: 190,
      backgroundColor: "#FF3B30",
      marginTop: 40,
      marginBottom: 40
    },
    image: {
      height: 300,
      width: 300,
      marginTop: "5%",
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
