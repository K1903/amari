import React, { useContext } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Video } from 'expo-av';
import ScreenContext from './Contexts/ScreenContext';
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const ConfirmVideo = ({ route }) => {
  const { videoUri } = route.params;
  const [screen, setScreen] = useContext(ScreenContext);
  const navigator = useNavigation();


    //TODO: Save video here
const storeVideo = async (videoUri) => {
    try{
      await AsyncStorage.setItem('@videoUri', videoUri);
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
      onPress={() => storeVideo(videoUri)}>
        <Text>Save Video</Text>
      </TouchableHighlight>
    </View>
  );
};

export default ConfirmVideo;