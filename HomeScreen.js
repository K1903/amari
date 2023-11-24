// HomeScreen.js
import React, { useContext } from 'react';
import { View, Button, Text } from 'react-native';
import ScreenContext from './Contexts/ScreenContext';
import { TouchableHighlight } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [screen, setScreen] = useContext(ScreenContext);
  return (
    <View style={{backgroundColor:"white", flex:1}}>
      <Button
        title="Take a Photo"
        onPress={() => navigation.navigate('Camera')}
      />
      <TouchableHighlight
      onPress={() => setScreen("home")} 
      underlayColor={"#bfbfbf"}
      style={{alignItems:"center", justifyContent:"center", borderWidth:1.5, borderRadius:50, height:75, width:150, position:"absolute", bottom:"10%", alignSelf:"center"}}>
                <Text style={{fontWeight:700, fontSize:16}}>Go Home</Text>
      </TouchableHighlight>
    </View>
  );
};

export default HomeScreen;
