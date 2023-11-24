import { useContext } from "react"
import { TouchableHighlight } from "react-native"
import { View, StyleSheet, Text, useWindowDimensions } from "react-native"
import { Image } from "react-native"
import ScreenContext from "./Contexts/ScreenContext"

const styles = StyleSheet.create({
    buttonView: {
        flex:1,
        flexDirection:"row", 
        position:"absolute", 
        bottom:"5%", 
        left:0, 
        right:0, 
        justifyContent:"center", 
        alignItems:"center"
    },
    leftButton: {
        borderWidth:1.5,
        width: 120,
        height: 80,
        justifyContent: "center",
        alignItems:"center",
        left:20,
        backgroundColor: "white"
    },
    centerButton: {
        borderWidth:1.5,
        justifyContent: "center",
        alignItems:"center",
        width: 130,
        height:100,
        borderRadius:50,
        backgroundColor:"white",
        zIndex: 3
    },
    rightButton: {
        borderWidth:1.5,
        width: 120,
        height: 80,
        justifyContent: "center",
        alignItems:"center",
        right:20,
        backgroundColor: "white"
    },
    homeIcon: {
        flex:0.5,
        aspectRatio: 1
    }
})

export const BottomThreeButtons = () => {
    const [screen, setScreen] = useContext(ScreenContext);
    return (
        <View style={styles.buttonView}>
            <TouchableHighlight onPress={() => setScreen("addArticle")} style={styles.leftButton} underlayColor={"#bfbfbf"}>
                <Text style={{fontWeight:700, fontSize:16}}>Add an{"\n"}Article</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => setScreen("home")} style={styles.centerButton} underlayColor={"#bfbfbf"}>
                <Image source={require("./assets/HomeIcon.png")} style={styles.homeIcon} alt="Icon of a house, representing the home button"></Image>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => setScreen("savedOutfits")} style={styles.rightButton} underlayColor={"#bfbfbf"}>
                <Text style={{fontWeight:700, fontSize:16}}> Saved{"\n"}Outfits</Text>
            </TouchableHighlight>
        </View>
    )
}