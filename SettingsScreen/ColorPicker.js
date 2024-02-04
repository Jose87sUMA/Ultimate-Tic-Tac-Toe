import {React, useContext, useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  Button
} from 'react-native';
import { ColorContext } from '../ColorContext';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ColorsPalette from '../ColorsPalette.js';


const CIRCLE_SIZE = 40;
const CIRCLE_RING_SIZE = 2;



export default function ColorPicker() {
    useEffect(() => {
        const getColorFromStorage = async () => {
          try {
            const valueX = await AsyncStorage.getItem('COLORX'); 
            const valueY = await AsyncStorage.getItem('COLORO'); 
            if (valueX !== null ) {
              setvalueX(JSON.parse(valueX));
                
            }
            if (valueY !== null ){
                setvalueO(JSON.parse(valueY));
                console.log('retrieving index' + valueY);
            }
          } catch (error) {
            console.error('Error retrieving game from AsyncStorage:', error);
          }
        };
      
        getColorFromStorage();
    }, []);


    
  const {setColorX, colorX, setcolorO, colorO} = useContext(ColorContext);
  const [valueX, setvalueX] = useState(valueX === null? 0 : valueX);
  const [valueY, setvalueO] = useState(valueY === null? 0 : valueY);
  const [editing, setEditing] = useState('Y');
  const sheet = useRef();

 


  console.log(colorX);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.placeholder}>
        <View style={styles.placeholderInset}>
          <Button color={colorX}  title="X" onPress={() => {setEditing('X'); sheet.current.open() }} />
          <Button color={colorO}  title="O" onPress={() => {setEditing('Y'); sheet.current.open() }} />
        </View>
      </View>

      <RBSheet
        customStyles={{ container: styles.sheet }}
        height={440}
        openDuration={250}
        ref={sheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetHeaderTitle}>{editing === 'X'? 'Select a color for X' : 'Select a color for O'} </Text>
        </View>
        <View style={styles.sheetBody}>
          <View style={[styles.profile,
            editing === 'X' && { backgroundColor: ColorsPalette[valueX] },
            editing === 'Y' && { backgroundColor: ColorsPalette[valueY] }]}>
            <Text style={styles.profileText}>{editing === 'X'? 'X' : 'O'}</Text>
          </View>
          <View style={styles.group}>
            {ColorsPalette.map((item, index) => {
              const isActive = editing === 'X'? valueX === index : valueY === index ;
              const isInactive = editing === 'X'? valueY === index : valueX === index ;
              return (
                <View key={item}>
                  <TouchableWithoutFeedback

                    onPress={() => {
                        if(!isInactive){
                            
                            if(editing == 'X'){
                                setvalueX(index);
                                setColorX(ColorsPalette[index]);
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
                            }else  if(editing == 'Y'){
                                setvalueO(index);
                                setcolorO(ColorsPalette[index]);
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
            style={styles.btn}
            onPress={() => {
                sheet.current.close()
            }}>
            <Text style={styles.btnText}>Confirm</Text>
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
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 24,
    backgroundColor: 'transparent',
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Sheet */
  sheet: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
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
  },
  sheetBody: {
    padding: 24,
  },
  /** Profile */
  profile: {
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
  profileText: {
    fontSize: 34,
    fontWeight: '600',
    color: 'white',
  },
  /** Circle */
  circle: {
    width: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    height: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    borderRadius: 9999,
    backgroundColor: 'white',
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
    color: 'white',
    alignSelf : 'center',
    color: 'black'
    
   
  },
  /** Button */
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    padding: 14,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#000',
    marginBottom: 12,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  }, 
  
});