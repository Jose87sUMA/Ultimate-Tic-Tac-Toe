import {React, useState, useEffect, useContext} from 'react';
import { SafeAreaView, View, StyleSheet, TouchableWithoutFeedback, Image, Text, Button, Modal, Switch, TouchableOpacity, useWindowDimensions, Dimensions, Platform, PixelRatio} from 'react-native';

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

  const {height, width, scale, fontScale} = useWindowDimensions();

  
  const fontSize = width < 600? 20:50;
  

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
        <TouchableOpacity style={styles.centeredView} onPressOut={() => {setModalVisible(false)}}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalView, {backgroundColor: colors.background, shadowColor: colors.text}]}>
              <View style={styles.modalRow}>
                <Text style={[styles.modalText, {color: colors.text}]}>Enable AI?</Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#E8E8E8' }}
                  thumbColor={AIEnabled ? '#606060' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={AIEnabled}
                />
              </View>

              {AIEnabled && (
                <View style={styles.modalRow}>
                  <Text style={[styles.modalText, {color: colors.text}]}>AI Symbol:</Text>
                  <AwesomeButton
                    title={AISymbol}
                    backgroundColor='white'
                    borderColor='white'
                    textColor= {AISymbol==='X' ? '#007AFF' : '#FF3B30'}
                    textSize={20}
                    raiseLevel={0}
                    onPress={() => setAISymbol(AISymbol === 'O' ? 'X' : 'O')}
                  >{AISymbol}</AwesomeButton>
                </View>
              )}
              <ButtonComponent
                  style={{backgroundColor: "#007AFF", height: '30%',backgroundColor: ColorsPalette[valueX], borderColor: colors.text, width: '50%'}}
                  text={"Create Game"}
                  onPress={() => {setModalVisible(false);
                   navigation.navigate('Tic_Tac_Toe', {continuingGame: false, AIMoveSymbol: AIEnabled ? AISymbol:' '})}}
              ></ButtonComponent>
              
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      <View style = {{flex : 1, flexDirection: 'column'}}>
        <View style = {styles.HomeTitleComponent}>
          <HomeTitleComponent style={[{color: colors.text}]} styleHeader = {{fontSize: width < 600? 60 : 120}} />
        </View>
        <View style={styles.buttonsContainerIns}>
          <View style={styles.buttons}>
            <ButtonComponent
              style={[styles.sideButton, {backgroundColor: ColorsPalette[valueX], borderColor: colors.text}]}
              styleText = {{fontSize: fontSize}}
              text={"NEW GAME"}
              onPress={() => setModalVisible(true)}
            />
            <ButtonComponent
              style={[styles.middleButton, {backgroundColor: ColorsPalette[valueO], borderColor: colors.text}]}
              text={"CONTINUE"}
              onPress={() => navigation.navigate('Tic_Tac_Toe', {continuingGame: true})}
              styleText = {{fontSize: fontSize}}
            />
            <ButtonComponent
              style={[styles.sideButton, {backgroundColor: ColorsPalette[valueX], borderColor: colors.text}]}
              text={"TUTORIAL"}
              onPress={() => navigation.navigate('Tutorial')}
              styleText = {{fontSize: fontSize}}
            />
          </View>
        </View>
      </View>
      
      <View style={styles.homeComponentsFiller}></View>
          
    </SafeAreaView>  

  ); 
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
   
    },
    HomeTitleComponent: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: '10%'
    
     
    },
    buttonsContainerIns: {
      flexDirection: "column",
      alignSelf: "center",
      flex : 1,
  
      
      align: 'center',
      width: '100%',
     
     
      
    },
    buttons : {
        //justifyContent: 'space-around'
        //borderColor: 'gray',
        //borderWidth: 4,
        flex: 1,
        marginHorizontal :'25%',
        marginBottom: '25%',
        justifyContent: 'space-evenly', 
        
        
    },
    sideButton: {
      backgroundColor: "#007AFF",
      height: '20%'

     
    },
    middleButton: {
      backgroundColor: "#FF3B30",
      height: '20%'
      
    
    },
    tabComponent: {
      width: '100%',

    },  /*MODAL */
    modalView: {
      margin: 20,
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowOpacity: 1,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
  
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
  });


export default HomeScreen;


/*  <Image
        source={require("../assets/images/tic_tac_toe.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>  */