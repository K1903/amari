// HomeScreen.js
import React from 'react';
import { View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Take a Photo"
        onPress={() => navigation.navigate('Camera')}
      />
    </View>
  );
};

export default HomeScreen;
