import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Video } from 'expo-av';
import ScreenContext from './Contexts/ScreenContext';
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useVideoContext } from './VideoContext';



const ConfirmVideo = ({ route }) => {
  const {videoKey, setKey} = useVideoContext();
  const { videoUri } = route.params;
  const [screen, setScreen] = useContext(ScreenContext);
  const navigator = useNavigation();

  useEffect(() => {
    setKey();
  }, []);



    //TODO: Save video here
  const storeVideo = async () => {
      try{
        await AsyncStorage.setItem(videoKey, videoUri);
        console.log("Video stored with key:", videoKey);
      } catch (e) {
        console.error('Error loading video data:', e)
      }

      navigator.navigate('SavedOutfits');
    }

  return (
    <View style={{flex: 1, marginTop: 100, alignItems: 'center'}}>
        <Text
        style={{fontSize:25, fontWeight:600, marginBottom:20}}>Preview</Text>
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
      <TouchableHighlight 
      style={{borderWidth:1.5, borderRadius:10, width:150, height:70, justifyContent:"center", alignSelf:"center", alignItems:"center", marginTop:60}}
      underlayColor={"#bfbfbf"}
      onPress={() => storeVideo()}>
        <Text>Save Video</Text>
      </TouchableHighlight>
    </View>
  );
};

export default ConfirmVideo;