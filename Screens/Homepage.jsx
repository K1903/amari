import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { BottomThreeButtons } from '../BottomThreeButtons';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import ScreenContext from '../Contexts/ScreenContext';

function Homepage(props) {
    const [screen, setScreen] = useContext(ScreenContext)

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
        },
        titleTextView: {
          flex:1,
          alignItems: "center",
          justifyContent: "center",
          marginBottom:"130%"
        },
        titleText: {
          fontSize:35
        },
        winterCloset: {
          borderWidth:1.5,
          width: 120,
          height: 80,
          position:"absolute",
          justifyContent: "center",
          alignItems:"center",
          alignSelf:"center",
          top:"30%",
          left:"15%"
        },
        springCloset: {
          borderWidth:1.5,
          width: 120,
          height: 80,
          position:"absolute",
          justifyContent: "center",
          alignItems:"center",
          alignSelf:"center",
          top:"30%",
          right:"15%"
        },
        summerCloset: {
          borderWidth:1.5,
          width: 120,
          height: 80,
          position:"absolute",
          justifyContent: "center",
          alignItems:"center",
          alignSelf:"center",
          top:"50%",
          left:"15%"
        },
        fallCloset: {
          borderWidth:1.5,
          width: 120,
          height: 80,
          position:"absolute",
          justifyContent: "center",
          alignItems:"center",
          alignSelf:"center",
          top:"50%",
          right:"15%"
        },
        allClothing: {
          borderWidth:1.5,
          width: 120,
          height: 80,
          position:"absolute",
          justifyContent: "center",
          alignItems:"center",
          alignSelf:"center",
          top:"70%",
        }
      });

    const navigateToCloset = (season) => {
        //Use season variable to load in the proper clothing
        setScreen("closet");
    };

    return (
        <View style={styles.container}>
          <View style={styles.titleTextView}>
            <Text style={styles.titleText}>Armari</Text>
          </View>
    
          <TouchableHighlight style={styles.winterCloset} underlayColor={"#bfbfbf"} onPress={() => navigateToCloset('Winter')}>
            <Text>Winter Closet</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.springCloset} underlayColor={"#bfbfbf"} onPress={() => navigateToCloset('Spring')}>
            <Text>Spring Closet</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.summerCloset} underlayColor={"#bfbfbf"} onPress={() => navigateToCloset('Summer')}>
            <Text>Summer Closet</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.fallCloset} underlayColor={"#bfbfbf"} onPress={() => navigateToCloset('Fall')}>
            <Text>Fall Closet</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.allClothing} underlayColor={"#bfbfbf"} onPress={() => navigateToCloset('All')}>
            <Text>All Clothing</Text>
          </TouchableHighlight>
    
            <BottomThreeButtons></BottomThreeButtons>
          <StatusBar style="auto" />
        </View>
      );
}

export default Homepage;