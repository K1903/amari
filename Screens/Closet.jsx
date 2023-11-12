import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomThreeButtons } from "../BottomThreeButtons";

/**
 * The main closet screen to display a closet for any season. We should use a context
 * to pass around a state variable/mutator to set which we can use to filter items
 * based on season
 */
function Closet(props) {

const styles = StyleSheet.create({
    headerText: {
        fontSize: 25,
        paddingLeft: 25,
        fontWeight: "bold"
    },
    horizScroll: {
        height: 200,
    },
    lastHorizScroll: {
        height:200,
        paddingVertical: 200
    }
})

    return (
        <View>
            <ScrollView style={{paddingTop:100}}>
                <Text style={styles.headerText}>Hat</Text>
                <ScrollView horizontal={true} style={styles.horizScroll}><Text>Img here</Text></ScrollView>
                <Text style={styles.headerText}>Outerwear</Text>
                <ScrollView style={styles.horizScroll}></ScrollView>
                <Text style={styles.headerText}>Shirt</Text>
                <ScrollView style={styles.horizScroll}></ScrollView>
                <Text style={styles.headerText}>Pants</Text>
                <ScrollView style={styles.horizScroll}></ScrollView>
                <Text style={styles.headerText}>Shoes</Text>
                <ScrollView style={styles.lastHorizScroll}></ScrollView>
            </ScrollView>
            <View style={{position:"absolute", bottom:"5%", left:0, right:0}}>
                <BottomThreeButtons/>
            </View>
        </View>
    )
}

export default Closet;