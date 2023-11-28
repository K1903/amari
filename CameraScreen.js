
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const CameraScreen = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);


  useEffect(() =>{
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, [])

  const takePicture = async () => {
    if (cameraRef) {
      try{
        const options = { quality: 0.5, base64: true };
        const data = await cameraRef.current.takePictureAsync();
        navigation.navigate('ObjectCreation', { photo: data });
      } catch(e) {
        console.log(e);
      }
    }
  };



  if(hasCameraPermission === false) {
    return <Text>No Access To Camera</Text>
  }


  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        ref={cameraRef}
      >
        <Button title={'Take Picture'} icon="camera" onPress={takePicture} />
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  }
});

export default CameraScreen;
