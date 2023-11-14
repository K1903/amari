
import React from 'react';
import { View, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';

const CameraScreen = ({ navigation }) => {
  const takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      navigation.navigate('ObjectCreation', { photo: data });
    }
  };

  return (
    <View>
      <RNCamera
        ref={(ref) => {
          this.camera = ref;
        }}
        style={{ flex: 1 }}
      />
      <Button title="Take Picture" onPress={takePicture} />
    </View>
  );
};

export default CameraScreen;
