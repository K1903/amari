
import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Image, Text, Keyboard, TouchableWithoutFeedback} from 'react-native';
import Checkbox from 'expo-checkbox';
import Belt from './belt.js'; // Import your specific object constructors
import Hat from './hat.js';
import Jacket from './jacket.js';
import Pants from './pants.js';
import Shirt from './shirt.js';
import Shoes from './shoes.js';
import Accessory from './accessory.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ScreenContext from './Contexts/ScreenContext.js';
import ClothingStorage from './ClothingStorage';

const ObjectCreationScreen = ({ route }) => {
  const [objectType, setObjectType] = useState('');
  const [season, setSeason] = useState('');
  const [objectName, setObjectName] = useState('');
  const { photo } = route.params;
  const [screen, setScreen] = useContext(ScreenContext);


  const itemTypes = ['Belt', 'Hat', 'Jacket', 'Pants', 'Shirt', 'Shoes', 'Accessory'];

  const clothingStorage = new ClothingStorage();

  const saveObject = () => {
    const newItem = createObject(objectType, season, objectName, photo);
    if (newItem){
      clothingStorage.store(newItem);
    }
    console.log('Object saved:', newItem);
    setScreen("home");
  };

  const createObject = (type, season, name, photo) => {
    switch (type) {
      case 'Belt':
        return new Belt(name, season, photo); // Replace with your Belt constructor
      case 'Hat':
        return new Hat(name, season, photo); // Replace with your Hat constructor
      case 'Jacket':
        return new Jacket(name, season, photo); // Replace with your Jacket constructor
      case 'Pants':
        return new Pants(name, season, photo); // Replace with your Pants constructor
      case 'Shirt':
        return new Shirt(name, season, photo); // Replace with your Shirt constructor
      case 'Shoes':
        return new Shoes(name, season, photo); // Replace with your Shoes constructor
      case 'Accessory':
        return new Accessory(name, season, photo); // Replace with your Accessory constructor
      default:
        console.warn('Unknown object type:', type);
        return null;
    }
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
