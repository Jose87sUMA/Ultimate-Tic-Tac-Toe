import {React, useState} from 'react';
import { Modal, View, Text, StyleSheet} from 'react-native';
import AwesomeButton, { ThemedButton } from "react-native-really-awesome-button";

const WinnerModal = ({ modalVisible, winner, setModalVisible, navigation }) => {

  const getModalBackgroundColor = () => {
    if (winner === ' ') {
      return colors.text;
    } else if (winner === 'X') {
      return '#007AFF';
    } else {
      return '#FF3B30';
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
        <View style={{ ...styles.modalContainer }}>
          <Text style={{
            ...styles.modalText,
            color: winner === ' ' ? colors.text : winner === 'X' ? '#007AFF' : '#FF3B30'
          }}>{winner === ' ' ? 'It\'s a tie!' : winner + ' wins!'}</Text>
          <AwesomeButton
            borderWidth={2}
            backgroundColor={getModalBackgroundColor()}
            borderColor='#000000'
            backgroundDarker='#000000'
            textColor='#FBFBFB'
            raiseLevel={2}
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('HomeScreen');
            }}
          >Go Home</AwesomeButton>
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
        fontSize: 42,
        textAlign: 'center',
        fontFamily: 'Acme',
      },
    });

export default WinnerModal;