import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import {Video} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';


const PlaybackScreen = () => {
  const [videoUri, setVideoUri] = useState('');
    
  const getVideoUri = async () => {
    try {
      const videoUri = await AsyncStorage.getItem('@videoUri');
      return videoUri;
    } catch (error) {
      console.error('Error retrieving the video URI', error);
    }
  };


  useEffect(() => {
    const fetchVideoUri = async () => {
      const uri = await getVideoUri();
      setVideoUri(uri);
    };

    fetchVideoUri();
  }, []);



  return (
    <View style={{flex: 1, marginTop: 100, alignItems: 'center'}}>
      <Video
        source={{ uri: videoUri }}
        rate={1.0}
        isMuted={true}
        isLooping={true}
        resizeMode="cover"
        shouldPlay
        useNativeControls
        style={{width: 350, height: 450}}
      />
    </View>
  );
};

export default PlaybackScreen