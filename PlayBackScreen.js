import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useVideoContext } from './VideoContext';



const PlaybackScreen = () => {
  const { videoKey } = useVideoContext();
  const [videoUri, setVideoUri] = useState(null);

  const getVideoUri = async () => {
    try {
      console.log(videoKey)
      const uri = await AsyncStorage.getItem(videoKey);
      return uri;
    } catch (error) {
      console.error('Error retrieving the video URI', error);
    }
  };

  useEffect(() => {
    const fetchVideoUri = async () => {
      const uri = await getVideoUri();
      console.log("Retrieved video with key:", videoKey);
      setVideoUri(uri);
    };

    fetchVideoUri();
  }, [videoKey]);


  return (
    <View style={{ flex: 1, marginTop: 100, alignItems: 'center' }}>
      <Video
        source={{ uri: videoUri }}
        rate={1.0}
        isMuted={true}
        isLooping={true}
        resizeMode="cover"
        shouldPlay
        useNativeControls
        style={{ width: 350, height: 450 }}
      />
    </View>
  );
};

export default PlaybackScreen;
