import {React, useContext, useState, useRef,} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  Button,
  useWindowDimensions
} from 'react-native';
import { ColorContext } from '../styles/contexts/ColorContext.js';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ColorsPalette from '../styles/colorsPalettes/ColorsPalette.js';
import ColorsPaletteSoft from '../styles/colorsPalettes/ColorsPaletteSoft.js';
import { useTheme } from '@react-navigation/native';


const CIRCLE_SIZE = 40;
const CIRCLE_RING_SIZE = 2;



export default function ColorPicker(props) {
   

  const {colors} = useTheme();
    
  const {valueX, setValueX, valueO, setValueO} = useContext(ColorContext);
  
  const [editing, setEditing] = useState('O');
  const sheet = useRef();

  const {height, width, scale, fontScale} = useWindowDimensions();
  const bigWidth = width >= 750;



  return (
    <SafeAreaView style={[styles.container, props.styleContainer]}>
        <Text style={[props.styleText, styles.personaliseText]}>Personalise colors</Text> 
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.buttonSelColor, {backgroundColor: ColorsPalette[valueX], borderColor:  colors.text, height: bigWidth? 140: 70, width: bigWidth? 140: 70}]} onPress={() => {setEditing('X'); sheet.current.open() }} >
            <Text style = {styles.btnText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonSelColor, {backgroundColor: ColorsPalette[valueO], borderColor:  colors.text, height: bigWidth? 140: 70, width: bigWidth? 140: 70}]} onPress={() => {setEditing('O'); sheet.current.open() }} >
            <Text style = {styles.btnText}>O</Text>
          </TouchableOpacity>
        </View>
        
 

      <RBSheet
        customStyles={{ container: { ...styles.sheet, backgroundColor: editing === 'X'? ColorsPaletteSoft[valueX] : ColorsPaletteSoft[valueO] } }}
        height={440}
        openDuration={250}
        ref={sheet}>
        <View style={[styles.sheetHeader, editing === 'X' && {backgroundColor: ColorsPalette[valueX]}, editing === 'O' && {backgroundColor: ColorsPalette[valueO]}]}>
          <Text style={styles.sheetHeaderTitle}>{editing === 'X'? 'Select a color for X' : 'Select a color for O'} </Text>
        </View>
        <View style={[styles.sheetBody, editing === 'X' && {backgroundColor : ColorsPaletteSoft[valueX]}, editing === 'O' && {backgroundColor : ColorsPaletteSoft[valueO]}]}>
          <View style={[styles. mainSymbole,
            editing === 'X' && { backgroundColor: ColorsPalette[valueX] },
            editing === 'O' && { backgroundColor: ColorsPalette[valueO] }]}>
            <Text style={styles. mainSymboleText}>{editing === 'X'? 'X' : 'O'}</Text>
          </View>
          <View style={styles.group}>
            {ColorsPalette.map((item, index) => {
              const isActive = editing === 'X'? valueX === index : valueO === index ;
              const isInactive = editing === 'X'? valueO === index : valueX === index ;
              return (
                <View key={item}>
                  <TouchableWithoutFeedback

                    onPress={() => {
                        if(!isInactive){
                            
                            if(editing == 'X'){
                                setValueX(index);
                                _storeData = async () => {
                                    try {
                                     await AsyncStorage.setItem(
                                       'COLORX',
                                       JSON.stringify(index),
                                     )
                                   } catch (error) {
                                     // Error saving data
                                   }};
                                   _storeData();
                            }else  if(editing == 'O'){
                                setValueO(index);
                                _storeData = async () => {
                                    try {
                                     await AsyncStorage.setItem(
                                       'COLORO',
                                       JSON.stringify(index),
                                     )
                                   } catch (error) {
                                     // Error saving data
                                   }};
                                   _storeData();
                                   
                            }  
                        }
                      
                      
                    }}>
                    <View
                      style={[
                        styles.circle,
                        isActive && { borderColor: item },
                       
                      ]}>
                      <View
                        style={[styles.circleInside, !isInactive && { backgroundColor: item }]}/>
                        <Text style={[styles.circleText, {color: item }]}>{isInactive ? editing === 'X'? 'O' : 'X' : ''}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            style={[styles.btn, editing === 'X' && {backgroundColor: ColorsPalette[valueX]}, editing === 'O' && {backgroundColor: ColorsPalette[valueO]}]}
            onPress={() => {
                sheet.current.close()
            }}>
            <Text style={[styles.btnText]}>Done</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,

  },
  /** Placeholder */
  container: {
    borderWidth: 4,
    //borderColor: '#e5e7eb',
    //borderStyle: 'dashed',
    borderRadius: 9,
    flexDirection: 'column',
    alignSelf : 'center',
    backgroundColor: 'gray',
    
    
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf : 'center',
    padding:'10%',
  },
  buttonSelColor :{
    alignSelf: 'center',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20, 
    borderRadius: 5,
    borderWidth: 1,
    },
  personaliseText :{
      
     
  },
  /** Sheet */
  sheet: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: 'red',
  },
  sheetHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  sheetHeaderTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white'
  },
  sheetBody: {
    padding: 24,
  },
  /**  mainSymbole */
   mainSymbole: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
   mainSymboleText: {
    fontSize: 34,
    fontWeight: '600',
    color: 'white',
  },
  /** Circle */
  circle: {
    width: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    height: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    borderRadius: 9999,
    
    borderWidth: CIRCLE_RING_SIZE,
    borderColor: 'transparent',
    marginRight: 8,
    marginBottom: 12,
  },
  circleInside: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 9999,
    position: 'absolute',
    top: CIRCLE_RING_SIZE,
    left: CIRCLE_RING_SIZE,
  },
  circleText: {
    fontSize: CIRCLE_SIZE*0.75,
    fontWeight: 'bold',
    alignSelf : 'center',
  },
  /** Button */
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    padding: 14,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#000',
    marginBottom: 12,
  },
  btnText: {
    fontSize: 30,
    fontWeight: '600',
    color: '#fff',
  }, 
  
  
});