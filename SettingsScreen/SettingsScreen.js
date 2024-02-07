import React, {useState, useEffect, useContext} from 'react';
import { Modal, TextInput, Switch, SafeAreaView, View, StyleSheet, StatusBar, Image, Text, Button, useColorScheme, Appearance, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

import * as Sentry from "sentry-expo";

import { signInAnonymously, onAuthStateChanged, getAuth } from 'firebase/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getDocs, setDoc, doc, query, where} from 'firebase/firestore';
import {firestore, auth} from '../Firebase/firebaseConfig';

import { ThemeContext } from '../styles/contexts/ThemeContext';
import { ColorContext } from '../styles/contexts/ColorContext';
import ColorPicker from './ColorPicker';
import ThemePicker from './ThemePicker';
import ResetColorTheme from './ResetColorTheme';
import * as Font from 'expo-font';

import ColorsPalette from '../styles/colorsPalettes/ColorsPalette';
import ColorsPaletteSoft from '../styles/colorsPalettes/ColorsPaletteSoft';

const loadFonts = async () => {
  await Font.loadAsync({
    Acme: require('../assets/fonts/Acme.ttf'), 
  });
};

const SettingsScreen = ({navigation}) => {
  const {colors} = useTheme();
  const { setTheme, theme } = useContext(ThemeContext);
  const{valueO, valueX} = useContext(ColorContext);
  const [user, setUser] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


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
    } catch (error) {
      console.error('Error authenticating user:', error.message);
      Sentry.Native.captureException('Error authenticating user:', error.message);
    }
  };

  const registerUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setModalVisible(false);
    } catch (error) {
      console.error('Error registering user:', error.message);
      Sentry.Native.captureException('Error registering user:', error.message);
    }
  };


  const saveToCloud = async () => {
    if (!user) {
      await authenticateUser();
    }
  
    const finishedGames = await AsyncStorage.getItem('finishedGames');
  
    try {
      // Replace 'finishedGames' with the actual name of your collection
      const gamesRef = collection(firestore, 'finishedGames');
      
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
          console.log(docSaved.id, ' => ', docSaved.data());
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
    } catch (error) {
      console.error('Error saving game to cloud:', error.message);
      Sentry.Native.captureException('Error saving game to cloud:', error.message);
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
        }
        else {
          AsyncStorage.removeItem('finishedGames');
        }
      });
    } catch (error) {
      console.error('Error syncing games from cloud:', error.message);
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
    }
    catch (error) {
      console.error('Error deleting games from cloud:', error.message);
      Sentry.Native.captureException('Error deleting games to cloud:', error.message);
    }
  };

  const toggleSwitch = () => {
    const changedTheme = theme == 'light'? 'dark':'light';
    setTheme(changedTheme);
    _storeData = async () => {
         try {
          await AsyncStorage.setItem(
            'THEME',
            JSON.stringify(changedTheme),
          )
        } catch (error) {
          console.error('Error saving theme to local storage:', error.message);
          Sentry.Native.captureException('Error saving theme to local storage:', error.message);
        }

    Appearance.setColorScheme(changedTheme);
    }
    _storeData();

  }

  const {width} = useWindowDimensions();
  const fontSize = width < 750? 20:40;
  const intermidiateFontSize = width < 750? 25:50;
  const headerFontSize =  width < 750? 50:100;
  const bigWidth = width >= 750;
  return (
  
  <SafeAreaView style={{flex : 1}}>
    <View style={{height : '15%', justifyContent: 'flex-end', alignContent: 'center'}}>
      <Text style={[styles.headerTitle, {color: colors.text, fontSize: headerFontSize}]}>Settings</Text>
    </View>
    <View style={{...styles.separator}} />
    <View style ={styles.containerInset}>
      <ThemePicker styleText = {{...styles.textOptions, color: colors.text}} styleContainer = {{...styles.boxOptions, backgroundColor: colors.border}}></ThemePicker> 
      <ColorPicker styleText = {{...styles.textOptions, color: colors.text}} styleContainer= {{...styles.boxOptions, backgroundColor: colors.border}} bi></ColorPicker> 
      <ResetColorTheme styleText = {{...styles.textOptions, color: colors.text}} styleContainer= {{...styles.boxOptions, backgroundColor: colors.border}}></ResetColorTheme> 

      <View style={styles.separator} />
      {user ? (
        <View>
          <View style={styles.cloudButtonsContainer}>
            <Button title="Save to Cloud" onPress={saveToCloud} />
            <Button title="Sync from Cloud" onPress={syncFromCloud} />
          </View>
          <View style={styles.cloudButtonsContainer}>
          <Button title="Delete Games from Cloud" onPress={deleteFromCloud} /> 
          </View>
          <View style={styles.cloudButtonsContainer}>
            <Button title="Logout" onPress={() => setUser(null)} />
          </View>
        </View>

        ) : (
          <Button title="Login/Register" onPress={() => setModalVisible(true)} />
      )}

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Login or Register</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.input}
          />
          <Button title="Login" onPress={authenticateUser} />
          <Button title="Register" onPress={registerUser} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
     
    </View>    
  </SafeAreaView>


);};

const styles = StyleSheet.create({
  containerInset: {
    //borderWidth: 4,
    //borderColor: '#e5e7eb',
    //borderStyle: 'dashed',
    //borderRadius: 9,
    height: '85%',
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center'
    
   
  },
  headerTitle: {
    fontSize: 50,
    fontFamily: 'Acme',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  separator: {
    height: 2, 
    width: '100%',
    backgroundColor: 'gray', 
  },
  textOptions:{
    
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: '3%',
    borderColor: 'black',
    fontFamily: 'Acme',
    
    
  },
  boxOptions:{
    width: '75%',
    borderWidth: 0,
    margin: 5,
    paddingVertical: '5%',
    backgroundColor: '#B8DAFF'
    
  },
  cloudButtonsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
});

export default SettingsScreen;


