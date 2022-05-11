import {View,Dimensions,TextInput,Text, StyleSheet,TouchableOpacity, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { images } from '../assets';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

function Converter({ route, navigation }) {
  const [number, onChangeNumber] = useState(null);
  const [text, setText] = useState("");
  const [textResult, setTextResult] = useState("");
  const { itemId } = route.params;

  const onClickConvertButton = (itemId) => {
    if (number !== null) {
      switch(itemId){
        case 1: 
          setTextResult(`${(number * 9/5) + 32} Fahrenheit`);
          break;
        case 2:
          setTextResult(`${number * 12} Inches`);
          break;
        case 3:
          setTextResult(`${number * 2.205} Lbs`);
          break;
        case 4:
          setTextResult(`${number * 1000} Volt`);
          break;
        case 5:
          setTextResult(`${number * 0.10197} kG`);
          break;
      }
    } else {
      Alert.alert("Please enter the value");
    } 
  }

  const handleSetText = (itemId) => {
    if(itemId === 1){
      setText("Celsius");
    } else if(itemId === 2) {
      setText("Feet");
    } else if(itemId === 3) {
      setText("kG");
    } else if(itemId === 4) {
      setText("kV");
    } else{ 
      setText("NewTon");
    }
  }

  

  useEffect(()=> {
    handleSetText(itemId);
  }, []);


  return (
    <View style={appStyle.homeView}>
      <Text style={appStyle.textlabel}>{text}</Text>
      <TextInput
        style={appStyle.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Your Value"
        keyboardType="numeric"
      />
      <TouchableOpacity
          onPress={() => onClickConvertButton(itemId)}
          style={appStyle.buttonStyle}>
            <Image source={images.convert} style={appStyle.buttonStyle} />
      </TouchableOpacity>
      {textResult !== null && <Text style={appStyle.textlabel}>{textResult}</Text>}
    </View>
  );
};

export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#223351',
    paddingTop: windowHeight * 0.15,
  },
  textlabel: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: windowHeight * 0.05,
  },
  input: {
    height: 60,
    width: windowWidth * 0.8,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
  },
  buttonStyle: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    resizeMode: 'contain',
    margin: 10,
  }
});

export default Converter;