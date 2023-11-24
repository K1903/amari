
import React, { useState } from 'react';
import { View, TextInput, Button, Image, CheckBox } from 'react-native';
import Belt from './belt.js'; // Import your specific object constructors
import Hat from './hat.js';
import Jacket from './jacket.js';
import Pants from './pants.js';
import Shirt from './shirt.js';
import Shoes from './shoes.js';
import Accessory from './accessory.js';

const ObjectCreationScreen = ({ route }) => {
  const [objectType, setObjectType] = useState('');
  const [season, setSeason] = useState('');
  const [objectName, setObjectName] = useState('');
  const { photo } = route.params;

  const itemTypes = ['Belt', 'Hat', 'Jacket', 'Pants', 'Shirt', 'Shoes', 'Accessory'];

  const saveObject = () => {
    // Assuming you have a function to save the object, replace this with your logic
    const newItem = createObject(objectType, season, objectName, photo);
    console.log('Object saved:', newItem);
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
    <View>
      <Image source={{ uri: photo.uri }} style={{ width: 200, height: 200 }} />

      {/* Checklist for item type */}
      <View>
        {itemTypes.map((type) => (
          <CheckBox
            key={type}
            title={type}
            checked={objectType === type}
            onPress={() => setObjectType(type)}
          />
        ))}
      </View>

      {/* Season selection */}
      <TextInput
        placeholder="Enter Season"
        value={season}
        onChangeText={(text) => setSeason(text)}
      />

      {/* Name input */}
      <TextInput
        placeholder="Enter Object Name"
        value={objectName}
        onChangeText={(text) => setObjectName(text)}
      />

      {/* Save button */}
      <Button title="Save Object" onPress={saveObject} />
    </View>
  );
};

export default ObjectCreationScreen;
