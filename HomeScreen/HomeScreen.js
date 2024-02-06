import {React, useState, useEffect, useContext} from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar, Image, Text, Button, Modal, Switch} from 'react-native';

import HomeTitleComponent from "./homeComponents/HomeTitleComponent";
import ButtonComponent from "./homeComponents/ButtonComponent";
import AwesomeButton, { ThemedButton } from "react-native-really-awesome-button";
import * as Font from 'expo-font';
import { useTheme } from '@react-navigation/native';
import { ColorContext } from '../styles/contexts/ColorContext';
import ColorsPalette from '../styles/colorsPalettes/ColorsPalette';

//import { useTheme } from 'react-native-paper';

const loadFonts = async () => {
  await Font.loadAsync({
    Acme: require('../assets/fonts/Acme.ttf'), 
  });
};

const HomeScreen = ({navigation}) => {
  const { valueX, valueO} = useContext(ColorContext);
  const {colors} = useTheme();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [AIEnabled, setAIEnabled] = useState(false);
  const [AISymbol, setAISymbol] = useState('O');

  const toggleSwitch = () => setAIEnabled(previousState => !previousState);
  
  useEffect(() => {
    const loadAsync = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadAsync();
  }, []);

  if (!fontsLoaded) {
    return null; // You can render a loading component or return null until the fonts are loaded
  }

 
 
  return (
    <SafeAreaView style={[styles.container,{backgroundColor: colors.background},]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
    
            <View style={styles.modalRow}>
              <Text style={styles.modalText}>Enable AI?</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#ADCBFF' }}
                thumbColor={AIEnabled ? '#81b0ff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={AIEnabled}
              />
            </View>

            {AIEnabled && (
              <View style={styles.modalRow}>
                <Text style={styles.modalText}>AI Symbol:</Text>
                <AwesomeButton
                  title={AISymbol}
                  backgroundColor='#FFFFFF'
                  borderColor='#000000'
                  backgroundDarker='#000000'
                  textColor= {AISymbol==='X' ? '#007AFF' : '#FF3B30'}
                  textSize={20}
                  raiseLevel={0}
                  onPress={() => setAISymbol(AISymbol === 'O' ? 'X' : 'O')}
                >{AISymbol}</AwesomeButton>
              </View>
            )}

            <AwesomeButton 
              borderWidth= {2}
              backgroundColor='#007AFF'
              borderColor='#000000'
              backgroundDarker='#000000'
              textColor='#FBFBFB'
              raiseLevel={2}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Tic_Tac_Toe', {continuingGame: false, AIMoveSymbol: AIEnabled ? AISymbol:' '})
            }}
            >Create Game</AwesomeButton>
          </View>
        </View>
      </Modal>

      <HomeTitleComponent style={[styles.HomeTitleComponent, {color: colors.text}]}></HomeTitleComponent>
      <View style={styles.buttons}>
        <ButtonComponent
          style={[styles.sideButton, {backgroundColor: ColorsPalette[valueX]}]}
          text={"NEW GAME"}
          onPress={() => setModalVisible(true)}
        ></ButtonComponent>
        <ButtonComponent
          style={[styles.middleButton, {backgroundColor: ColorsPalette[valueO]}]}
          text={"CONTINUE"}
          onPress={() => navigation.navigate('Tic_Tac_Toe', {continuingGame: true})}
        ></ButtonComponent>
        <ButtonComponent
          style={[styles.sideButton, {backgroundColor: ColorsPalette[valueX]}]}
          text={"TUTORIAL"}
          onPress={() => navigation.navigate('Tutorial')}
        ></ButtonComponent>
      </View>
    
      
      <View style={styles.homeComponentsFiller}></View>
          
    </SafeAreaView>  

  ); 
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
     
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      marginBottom: 20,
    },
    
    modalText: {
      fontSize: 18,
      marginRight: 10,
      fontFamily: 'Acme',
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


/*  <Image
        source={require("../assets/images/tic_tac_toe.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>  */