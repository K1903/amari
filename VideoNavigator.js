
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SavedOutfits from './Screens/SavedOutfits';
import VideoScreen from "./VideoScreen";
import ConfirmVideo from './ConfirmVideo';

const Stack = createStackNavigator();

const VideoNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SavedOutfits">
        <Stack.Screen name="SavedOutfits" component={SavedOutfits} />
        <Stack.Screen name="VideoScreen" component={VideoScreen} />
        <Stack.Screen name="ConfirmVideo" component={ConfirmVideo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default VideoNavigator;