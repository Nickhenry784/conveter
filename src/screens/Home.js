import { View, StyleSheet, TouchableOpacity,Text, Dimensions, FlatList, Image, Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const numCol = 2;
const dataList = [{id: 1, image: images.ctof},{id: 2, image: images.feettoinch},{id: 3, image: images.kgtolbs},{id: 4, image: images.kvtovolt},{id: 5, image: images.newtontokg},{id: 6, image: images.buy}  ];

const Home = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(points);
  },[]);

  const clickFunctionItem = (id) => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    if(id === 6){
      navigation.navigate('BUY');
    }else{
      dispatch(decrement());
      navigation.navigate("Converter", {
        itemId: id,
      });
    }
  }


  return (
    <View style={appStyle.homeView}>
      <View style={appStyle.turnView}>
        <Image source={images.buyicon} style={appStyle.buyImage}/>
        <Text style={appStyle.turnText}>{points.value}</Text>
      </View>
      <Text style={appStyle.textlabel}>Choose your funtion</Text>
      <FlatList 
        data={dataList} 
        scrollEnabled={false} 
        numColumns={numCol} 
        renderItem={({item}) => (<TouchableOpacity
          onPress={() => clickFunctionItem(item.id)}
          key={item.id}
          style={appStyle.buttonStyle}>
            <Image source={item.image} style={appStyle.buttonStyle} />
          </TouchableOpacity>)} 
        />
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
  },
  turnView: {
    position: 'absolute',
    top: '5%',
    right: '0%',
    flexDirection: 'row',
    width: windowWidth * 0.25,
    alignItems: 'center',
  },
  turnText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  textlabel: {
    marginTop: windowHeight * 0.1,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: windowHeight * 0.05,
  },
  buttonStyle: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    resizeMode: 'contain',
    margin: 10,
  }
});

export default Home;