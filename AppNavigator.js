
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import CameraScreen from './CameraScreen';
import ObjectCreationScreen from './ObjectCreationScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="ObjectCreation" component={ObjectCreationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;