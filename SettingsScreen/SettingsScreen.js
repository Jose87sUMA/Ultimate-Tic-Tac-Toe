import {React, useState, useEffect, useContext} from 'react';
import { Modal, TextInput, Switch, SafeAreaView, View, StyleSheet, StatusBar,Image, Text, Button, useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

import { signInAnonymously, onAuthStateChanged, getAuth } from 'firebase/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getDocs, setDoc, doc, query, where} from 'firebase/firestore';
import {firestore, auth} from '../Firebase/firebaseConfig';

import { ThemeContext } from '../styles/contexts/ThemeContext';
import { ColorContext } from '../styles/contexts/ColorContext';
import ColorPicker from './ColorPicker';

import ColorsPalette from '../styles/colorsPalettes/ColorsPalette';
import ColorsPaletteSoft from '../styles/colorsPalettes/ColorsPaletteSoft';




const SettingsScreen = ({navigation}) => {
  const { colors } = useTheme();
  const { setTheme, theme } = useContext(ThemeContext);
  const { valueO, valueX } = useContext(ColorContext);
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
    }
  };

  const registerUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setModalVisible(false);
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };


  const saveToCloud = async () => {
    if (!user) {
      await authenticateUser();
    }
  
    const finishedGames = await AsyncStorage.getItem('finishedGames');
  
    if (user) {
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
      }
    }
  };

  const syncFromCloud = async () => {
    if (!user) {
      await authenticateUser();
    }
  
    if (user) {
      try {
        // Replace 'finishedGames' with the actual name of your collection
        const gamesRef = collection(firestore, 'finishedGames');
        const gamesQuery = query(gamesRef, where('user', '==', user.uid));
        const querySnapshot = await getDocs(gamesQuery);
  
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
          AsyncStorage.setItem('finishedGames', doc.data().finishedGamesJSON);
        });
      } catch (error) {
        console.error('Error syncing games from cloud:', error.message);
      }
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
          // Error saving data
        }

    Appearance.setColorScheme(changedTheme);
    }
    _storeData();

  }

  return (
  <View style={styles.container}>
    <SafeAreaView style={{flex : 1}}>
    <View style ={styles.containerInset}>

      <View style={styles.separator} />
      <View style={styles.themeModeContainer}>
    
        <Text style={[styles.textLeft, {color: colors.text}]}>Theme</Text> 
        <View style={styles.themeMode}>
          <Switch trackColor={{false: '#767577', true: ColorsPaletteSoft[valueO]}}
            thumbColor={theme == 'dark' ? ColorsPaletteSoft[valueX] : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={theme == 'dark'? true: false}
            style={{ transform: [{ scaleX: 1.5 }, { scaleY:   1.5}] }}
            />
        </View>
      </View>
      <View style={styles.separator} />
      <ColorPicker></ColorPicker> 
        
      <View style={styles.separator} />
      {user ? (
        <View>
          <View style={styles.cloudButtonsContainer}>
            <Button title="Save to Cloud" onPress={saveToCloud} />
            <Button title="Sync from Cloud" onPress={syncFromCloud} />
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
  </View>

);};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 24,
    backgroundColor: 'transparent',
    //borderWidth: 4,
    //borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    
  },
  containerInset: {
   // borderWidth: 4,
    //borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
   
  },
  themeModeContainer: {
   flexDirection: "row",
   alignSelf: 'center',    
   justifyContent: 'space-around',
   width: '50%'

  
  },
  themeMode: {
    
   },
  textLeft: {
    //margin: 16
    alignSelf: 'center',
    fontSize: 30
  },
  textRight: {
    //margin: 16
    alignSelf: 'center',
    fontSize: 30,
    marginLeft: 30
    
  },
  separator:{
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb', // Color of the separator
    marginVertical: 10, // Adjust the vertical spacing as needed
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


//<View style={styles.placeholder}> 
/*<Text style={{color: colors.text}}>Welcome to the settings 
Foto perfil, Cambio de idiomas, modo oscuro/claro, , posibilidad de deshacer movimiento, !</Text>*/