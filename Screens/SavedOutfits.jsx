import { Dimensions, Image, ScrollView, Text, TouchableHighlight, View } from "react-native";
import { BottomThreeButtons } from "../BottomThreeButtons";

const halfWidth = Math.round((Dimensions.get("window").width) / 2);

/**
 * Creates an outfit "card" with image, title, and button.
 */
function Outfit(props) {

    return (
        <View>

            <Image source={require("../assets/PixelArmoire.png")} height={halfWidth - 20} width={halfWidth - 20}></Image>
            <Text style={{alignSelf:"center", paddingBottom:15, fontSize:18}}>Placeholder Outfit</Text>
            <TouchableHighlight 
            style={{borderWidth:1.5, width: 100, height: 50, alignSelf:"center", alignItems:"center", justifyContent:"center"}}
            underlayColor={"#bfbfbf"}
            onPress={() => alert("Clicked live fitting button")}>
            <Text>Add Live Fitting</Text></TouchableHighlight>

        </View>     
    );
}

/**
 * Screen to view all saved outfits. Will have to iterate thru an array of
 * saved outfits and pass info it Outfit component
 */
function SavedOutfits(props) {

    return (
    <View style={{flex:1, backgroundColor:"white"}}>
    <ScrollView style={{paddingTop:100}}>
        <View style={{flexDirection:"row", alignSelf:"center", flexWrap:"wrap", width:halfWidth * 2 + 20}}>
            <Outfit/>
            <Outfit/>
            <Outfit/>
        </View>
    </ScrollView>
    <BottomThreeButtons></BottomThreeButtons>
    </View>
    );
}

export default SavedOutfits;