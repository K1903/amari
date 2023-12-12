import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import {Video} from 'expo-av';
import { useVideoContext } from './VideoContext';

const VideoScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);
  const navigator = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [video, setVideo] = useState();
  const {setKey} = useVideoContext();

  useEffect(() =>{
    (async () => {
      MediaLibrary.requestPermissionsAsync();

      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const microphoneStatus = await Camera.requestMicrophonePermissionsAsync();

      setHasCameraPermission(cameraStatus.status === 'granted');
      setHasMicrophonePermission(microphoneStatus.status === 'granted');
    })();
  }, [])


  if(hasCameraPermission === false) {
    return <Text>No Access To Camera</Text>
  }

  if(hasMicrophonePermission === false){
    return <Text>No Access to Microphone</Text>
  }


  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setIsRecording(true);

        let options = {
          quality: "1080p",
          maxDuration: 60,
          mute: false
        };

        const data = await cameraRef.current.recordAsync(options)
        setVideo(data)
        setIsRecording(false);
        navigator.navigate("ConfirmVideo", {videoUri: data.uri},);
        console.log("done recording")
      } catch (error) {
        console.error('Error:', error);
        setIsRecording(false)
      }
    }
  };


  const stopRecording = async () => {
    if (isRecording && cameraRef.current) {
      try {
        const data = cameraRef.current.stopRecording();
        setIsRecording(false);
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} ref={cameraRef}>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              alignSelf: "center",
              marginBottom: 30,
              borderWidth: 1.5,
              borderColor: "white",
              borderRadius: 50,
              width: 60,
              height: 60,
              backgroundColor: "red",
            }}
            onPressIn={() => {
                startRecording()
                setIsRecording(true)
            }}
            onPressOut={() => {
                stopRecording()
                setIsRecording(false)
            }}
          />
        </View>
      </Camera>
    </View>
  );
};


export default VideoScreen;