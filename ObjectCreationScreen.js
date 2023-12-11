
import React, {useContext, useEffect, useState} from 'react';
import { View, TextInput, Button, Image, Text, Keyboard, TouchableWithoutFeedback} from 'react-native';
import Checkbox from 'expo-checkbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ScreenContext from './Contexts/ScreenContext.js';
import ClothingStorage from './ClothingStorage';
import Clothing from "./Clothing";

const ObjectCreationScreen = ({ route }) => {
  const [objectType, setObjectType] = useState('');
  const [season, setSeason] = useState('');
  const [objectName, setObjectName] = useState('');
  const { photo } = route.params;
  const [screen, setScreen] = useContext(ScreenContext);


  const itemTypes = ['Belt', 'Hat', 'Jacket', 'Pants', 'Shirt', 'Shoes', 'Accessory'];

  const saveObject = async () => {

    const newItem = new Clothing(objectType, season, objectName, photo);
    try {
      const clothingStorage = new ClothingStorage();
      await clothingStorage.loadClothingArray();
      await clothingStorage.store(newItem);
    } catch (error) {
      console.error('Error:', error);
    }
    console.log('Object saved:', newItem);
    setScreen("home");
  };

  return (
    <KeyboardAwareScrollView style={{flex:1}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View>
      <Image source={{ uri: photo.uri }} style={{ width: 400, height: 400 }} />

      {/* Checklist for item type */}
      <View>
        {itemTypes.map((type) => (
          <View style={{flexDirection:"row", marginTop:10, alignItems:"center", marginLeft:10}} key={type}>
          <Checkbox
          style={{height:25, width:25}}
            title={type}
            value={objectType === type}
            onValueChange={() => setObjectType(type)}
          />
          <Text> {type}</Text>
          </View>
        ))}
      </View>

      {/* Season selection */}
      <TextInput
      style={{borderWidth: 1, height:30, marginTop:10}}
        placeholder="Enter Season"
        value={season}
        onChangeText={(text) => setSeason(text)}
      />

      {/* Name input */}
      <TextInput
      style={{borderWidth: 1, height:30, marginTop:10}}
        placeholder="Enter Object Name"
        value={objectName}
        onChangeText={(text) => setObjectName(text)}
      />

      {/* Save button */}
      <TouchableHighlight
      style={{borderWidth:1.5, borderRadius:10, width:150, height:70, justifyContent:"center", alignSelf:"center", alignItems:"center", marginTop:15}}
      underlayColor={"#bfbfbf"}
       onPress={() => saveObject()}>
        <Text style={{fontWeight:600}}>Save Object</Text>
      </TouchableHighlight>
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default ObjectCreationScreen;