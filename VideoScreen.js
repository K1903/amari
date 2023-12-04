import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

const VideoScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);
  const navigator = useNavigation();

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        const video = await cameraRef.current.recordAsync();
        setIsRecording(true);
        console.log("done recording")
        navigator.navigate("ConfirmVideo", {videoUri: video.uri});
      } catch (error) {
        console.error('Error:', error);
        setIsRecording(false)
      }
    }
  };

  const stopRecording = async () => {
    if (isRecording && cameraRef.current) {
      try {
        const video = await cameraRef.current.stopRecording();
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