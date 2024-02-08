import React, {useContext, useState} from 'react';
import { Modal, View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import {ColorContext } from '../styles/contexts/ColorContext.js';
import {useTheme} from '@react-navigation/native'
import ColorsPalette from '../styles/colorsPalettes/ColorsPalette.js';
import ColorsPaletteSoft from '../styles/colorsPalettes/ColorsPaletteSoft.js'; 
import ButtonComponent from '../HomeScreen/homeComponents/ButtonComponent.js';


const WinnerModal = ({ modalVisible, winner, setModalVisible, navigation }) => {
  const{valueX, valueO} = useContext(ColorContext);
  const {colors} = useTheme();
  const {width} = useWindowDimensions();
  const fontSize = width < 750? 20:40;
 
  const getModalBackgroundColor = () => {
    if (winner === ' ') {
      return colors.text;
    } else if (winner === 'X') {
      return ColorsPalette[valueX];
    } else {
      return ColorsPalette[valueO];
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={{ ...styles.modalContainer, ...{backgroundColor: colors.background, shadowColor: colors.text} }}>
          <Text style={{
            ...styles.modalText,
            color: winner === ' ' ? colors.text : winner === 'X' ? ColorsPalette[valueX] : ColorsPalette[valueO],
            fontSize: fontSize
          }}>{winner === ' ' ? 'It\'s a tie!' : winner + ' wins!'}</Text>
          <ButtonComponent
          style={ {backgroundColor: getModalBackgroundColor(), borderColor: colors.text, color : 'white', borderWidth: 1, borderColor: colors.text, width: '90%'}}
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('HomeScreen');
          }}
          text={"Go Home"}
          styleText = {{fontSize: fontSize}}
          />
         
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContainer: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        height: '20%',
        width: '50%',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        width: '100%',
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Acme',
      },
    });

export default WinnerModal;