import { TouchableHighlight } from "react-native"
import { View, StyleSheet, Text, useWindowDimensions } from "react-native"
import { Image } from "react-native"

function goToArticle() {
    // TODO: Navigate to camera
    alert("clicked article button")
}

function goHome() {
    //TODO: Navigate home
    alert("clicked home button")
}

function goToSavedOutfits() {
    //TODO: Navigate to saved outfits
    alert("clicked saved outfits button")
}

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
    return (
        <View style={styles.buttonView}>
            <TouchableHighlight onPress={goToArticle} style={styles.leftButton} underlayColor={"#bfbfbf"}>
                <Text style={{fontWeight:700, fontSize:16}}>Add an{"\n"}Article</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={goHome} style={styles.centerButton} underlayColor={"#bfbfbf"}>
                <Image source={require("./assets/HomeIcon.png")} style={styles.homeIcon} alt="Icon of a house, representing the home button"></Image>
            </TouchableHighlight>

            <TouchableHighlight onPress={goToSavedOutfits} style={styles.rightButton} underlayColor={"#bfbfbf"}>
                <Text style={{fontWeight:700, fontSize:16}}> Saved{"\n"}Outfits</Text>
            </TouchableHighlight>
        </View>
    )
}