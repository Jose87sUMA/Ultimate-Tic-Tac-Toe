import React, {useState, useEffect, useContext} from 'react';
import { Modal, TextInput, Switch, SafeAreaView, View, StyleSheet, StatusBar, Alert, Text, Button, useColorScheme, Appearance, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

import * as Sentry from "sentry-expo";

import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getDocs, setDoc, doc, query, where} from 'firebase/firestore';
import {firestore, auth} from '../Firebase/firebaseConfig';

import ButtonComponent from '../HomeScreen/homeComponents/ButtonComponent';

import { ThemeContext } from '../styles/contexts/ThemeContext';
import { ColorContext } from '../styles/contexts/ColorContext';
import ColorPicker from './ColorPicker';
import ThemePicker from './ThemePicker';
import ResetColorTheme from './ResetColorTheme';

import ColorsPalette from '../styles/colorsPalettes/ColorsPalette';
import ColorsPaletteSoft from '../styles/colorsPalettes/ColorsPaletteSoft';

const AuthenticationSection = (props) => {
  const {colors} = useTheme();
  const [user, setUser] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
 
  const {width} = useWindowDimensions();
  const smallSize = width < 750? 10:20;
  const smallBoxHeight = width < 750? 50: 100;
  const inputWidth = width*0.7;
  const buttonSize = width*0.5;
  const headerFontSize =  width < 750? 30:60;
  const fontSize =  width < 750? 20:40;


  // Check if the user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const authenticateUser = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setModalVisible(false);
      Alert.alert('Loged in ' + email);
    } catch (error) {
      
      console.error('Error authenticating user:', error.message);
      if(error.message.includes('invalid-email')){
        Alert.alert('Invalid Email');
      }else  if(error.message.includes('missing-password')){
        Alert.alert('Missing Password');
      }else if(error.message.includes('invalid-credential')){
        Alert.alert('User not found. Password or email incorrect');
      }else{
        Alert.alert('Unexpected error ocurred');
      }
      Sentry.Native.captureException('Error authenticating user:' + error.message);
    }
  };

  const registerUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setModalVisible(false);
    } catch (error) {
      console.error('Error registering user:', error.message);
      if(error.message.includes('invalid-email')){
        Alert.alert('Invalid Email');
      }else  if(error.message.includes('missing-password')){
        Alert.alert('Missing Password');
      }else if(error.message.includes('at least')){
        Alert.alert('Password must have at least six characters');
      }else{
        Alert.alert('Unexpected error ocurred');
      }
      
      Sentry.Native.captureException('Error registering user:', error.message);
    }
  };


  const saveToCloud = async () => {
    if (!user) {
      await authenticateUser();
    }
  
    const finishedGames = await AsyncStorage.getItem('finishedGames');
    if(finishedGames == null){
      Alert.alert('No games to save');
      return;
    }
  
    try {
      // Replace 'finishedGames' with the actual name of your collection
      const gamesRef = collection(firestore, 'finishedGames');
      console.log('gamesRef', gamesRef)
      // Check if a document with the user's UID already exists
      const gamesQuery = query(gamesRef, where('user', '==', user.uid));
      const querySnapshot = await getDocs(gamesQuery);

      if (querySnapshot.empty) {
        // If no document exists, create a new one
        await addDoc(gamesRef, {
          user: user.uid,
          finishedGamesJSON: finishedGames,
        });
      }
      else 
      {
        // If a document exists, update it with the new games
        querySnapshot.forEach( async (docSaved) => {
          const cloudGames = docSaved.data().finishedGamesJSON;

          const finishedGamesArr = JSON.parse(finishedGames)
          const cloudGamesArr = cloudGames ? JSON.parse(cloudGames) : [];

          // Function to check uniqueness based on the 'id' property
          const isUnique = (arr, obj) => arr.every(item => item.finishedDate !== obj.finishedDate);

          // Combined array without repeated objects based on 'id'
          const combinedArray = [...finishedGamesArr, ...cloudGamesArr.filter(obj => isUnique(finishedGamesArr, obj))];
          const combinedGames = JSON.stringify(combinedArray);

          const docId = querySnapshot.docs[0].id;
          await setDoc(doc(gamesRef, docId), {
            finishedGamesJSON: combinedGames,
          }, { merge: true });
        });     
      }

      console.log('Game saved to cloud successfully!');
      Alert.alert('Games saved successfully');
    } catch (error) {
      console.error('Error saving game to cloud:', error.message);
      Sentry.Native.captureException('Error saving game to cloud:', error.message);
      Alert.alert('Unexpected error occurred');
    }
    
  };

  const syncFromCloud = async () => {
    if (!user) {
      await authenticateUser();
    }

    try {
      // Replace 'finishedGames' with the actual name of your collection
      const gamesRef = collection(firestore, 'finishedGames');
      const gamesQuery = query(gamesRef, where('user', '==', user.uid));
      const querySnapshot = await getDocs(gamesQuery);

      querySnapshot.forEach((doc) => {
        if(doc.data().finishedGamesJSON != null) {
          AsyncStorage.setItem('finishedGames', doc.data().finishedGamesJSON);
          Alert.alert('Downloaded games successfully');
        }
        else {
          AsyncStorage.removeItem('finishedGames');
          Alert.alert('No games in the cloud');
        }
      });
    } catch (error) {
      console.error('Error syncing games from cloud:', error.message);
      Alert.alert('Error while retrieving games from cloud');
      Sentry.Native.captureException('Error syncing game to cloud:', error.message);
    }
    
  };
  
  const deleteFromCloud = async () => {
    if (!user) {
      await authenticateUser();
    }

    try {
      // Replace 'finishedGames' with the actual name of your collection
      const gamesRef = collection(firestore, 'finishedGames');

      // Check if a document with the user's UID already exists
      const gamesQuery = query(gamesRef, where('user', '==', user.uid));
      const querySnapshot = await getDocs(gamesQuery);
      const docId = querySnapshot.docs[0].id;
      await setDoc(doc(gamesRef, docId), {
        finishedGamesJSON: null,
      }, { merge: true });
      Alert.alert('Deleted games successfully');
    }
    catch (error) {
      console.error('Error deleting games from cloud:', error.message);
      Alert.alert('Unexpected error');
      Sentry.Native.captureException('Error deleting games to cloud:', error.message);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      Alert.alert('Loging out completed');
      // Additional cleanup or navigation logic if needed
    } catch (error) {
      console.error('Error logging out user:', error.message);
      Alert.alert('Error logging out user. Please try again.');
      Sentry.captureException('Error logging out user:', error.message);
    }
  };
 
  return (
   
  <SafeAreaView style={[styles.container, props.styleContainer]}>
  <Text style={[props.styleText, styles.personaliseText]}>Cloud Connection</Text> 
  
      {user ? (
            <View style={[styles.cloudButtonsContainer, {height: smallBoxHeight*4}]}>
                <ButtonComponent text="Save to Cloud" onPress={saveToCloud} style = {[props.grayButtonStyle,  {width: '100%', height: '15%'} ]} styleText = {{fontSize: smallSize}}/> 
                <ButtonComponent text="Sync from Cloud" onPress={syncFromCloud}  style = {[props.grayButtonStyle,  {width: '100%', height: '15%'}]} styleText = {{fontSize: smallSize}}/> 
                <ButtonComponent text="Delete Games from Cloud"onPress={deleteFromCloud} style = {[props.grayButtonStyle,  {width: '100%', height: '15%'}]} styleText = {{fontSize: smallSize}}/> 
                <ButtonComponent text="Logout" onPress={logout} style = {[props.grayButtonStyle, {width: '100%', height: '15%'}]} styleText = {{fontSize: smallSize}}/> 
            </View>

        ) : (
            <View style={[styles.cloudButtonsContainer, {height: smallBoxHeight}]}>
                <ButtonComponent text="Login/Register" onPress={() => setModalVisible(true)} style = {[props.grayButtonStyle,  {width: '100%', height: '60%'}]} styleText = {{fontSize: smallSize}}/> 
            </View>
          
      )}
 

      <Modal visible={isModalVisible} animationType="slide">
        <View style={{...styles.modalContainer, backgroundColor: colors.background}}>
          <View style = {{flex:1, justifyContent: 'flex-end'}}>
            <Text style={{...styles.modalTitle, fontSize: headerFontSize, color: colors.text}}>Login or Register</Text>
          </View>
          <View style = {{flex:1, justifyContent: 'center'}}>
            <TextInput
              testID='emailInput'
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={colors.text}
              style={{...styles.input, width: inputWidth, fontSize: fontSize, color:colors.text}}
            />
          
         
           <TextInput
              testID='passwordInput'
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              placeholderTextColor={colors.text}
              style={{...styles.input, width: inputWidth,  fontSize: fontSize, color: colors.text }}
            />
          </View>
          <View style = {{flex:1, justifyContent: 'space-evenly', marginBottom: '5%'}}>
            
            <ButtonComponent text="Login" onPress={authenticateUser} style = {[{width: buttonSize, height: '20%'}, props.grayButtonStyle]} styleText = {{fontSize: fontSize}}/> 
            <ButtonComponent text="Register" onPress={registerUser} style = {[{width: buttonSize, height: '20%'}, props.grayButtonStyle]} styleText = {{fontSize: fontSize}}/> 
            <ButtonComponent text="Cancel" onPress={() => setModalVisible(false)} style = {[{width: buttonSize, height: '20%'}, props.grayButtonStyle]} styleText = {{fontSize: fontSize}}/> 
          </View>
        </View>
      </Modal>  
  </SafeAreaView>


);};

const styles = StyleSheet.create({
    container : {

    },
    text:{
       
    },
  cloudButtonsContainer: {
   
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
    marginTop: '5%',
    //borderWidth: 5,
    height: 200,
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'Acme'
  },
  input: {
    height: '20%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 200,
  },
  button:{
    width: 200,
  }
});

export default AuthenticationSection;


