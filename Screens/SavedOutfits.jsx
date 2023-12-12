import { Dimensions, Image, ScrollView, Text, TouchableHighlight, View } from "react-native";
import { BottomThreeButtons } from "../BottomThreeButtons";
import { useNavigation } from "@react-navigation/native";
import ClothingStorage from "../ClothingStorage";
import {useEffect, useState} from "react";
import OutfitStorage from "../OutfitStorage";
import React, { useContext } from 'react';
import { useVideoContext } from '../VideoContext';

const halfWidth = Math.round((Dimensions.get("window").width) / 2);


/**
 * Creates an outfit "card" with image, title, and button.
 */
function Outfit(props) {
    const { removeOutfit } = props;

    const navigation = useNavigation();

    const addLiveFitting = () => {
        navigation.navigate("VideoScreen");
    }

    const playbackFitting = () => {
        navigation.navigate("PlayBackScreen");
    }

    const outfit = props.item;

    return (
        <View>
            <TouchableHighlight 
                style={{ borderWidth: 1.5, width: 50, height: 25, alignSelf: "center", alignItems: "center", justifyContent: "center" }}
                underlayColor={"#bfbfbf"}
                onPress={() => removeOutfit(outfit)}>
                <Text>Remove All Outfits</Text>
            </TouchableHighlight>
            <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
                <TouchableHighlight onPress={() => playbackFitting()}>
                    <Image source={require("../assets/PixelArmoire.png")} height={halfWidth - 20} width={halfWidth - 20} ></Image>
                </TouchableHighlight>
                {outfit.map((clothingItem, index) => (
                    <View key={index} style={{ marginRight: 10 }}>
                        <Image
                            source={{ uri: clothingItem.Image.uri }}
                            style={{ width: 100, height: 100, borderRadius: 5 }}
                        />
                    </View>
                ))}
            </ScrollView>
            
            <Text style={{alignSelf:"center", paddingBottom:15, fontSize:18}}>Placeholder Outfit</Text>
            <TouchableHighlight 
                style={{borderWidth:1.5, width: 100, height: 50, alignSelf:"center", alignItems:"center", justifyContent:"center"}}
                underlayColor={"#bfbfbf"}
                onPress={() => addLiveFitting()}>
                <Text>Add Live Fitting</Text>
            </TouchableHighlight>
        </View>     
    );
}

/**
 * Screen to view all saved outfits. Will have to iterate thru an array of
 * saved outfits and pass info it Outfit component
 */
function SavedOutfits(props) {
    const {videoKey, setKey} = useVideoContext();
    const [loadedArray, setLoadedArray] = useState([]);

    const removeOutfit = async (outfit) => {
        try {
          const outfitStorage = new OutfitStorage();
          await outfitStorage.remove(outfit);
          const data = await outfitStorage.loadOutfitArray();
          setLoadedArray(data || []);
        } catch (error) {
          console.error('Error removing outfit:', error);
        }
      };

    useEffect( () => {
        const loadOutfitData = async () => {
            try {
                const outfitStorage = new OutfitStorage();
                const data = await outfitStorage.loadOutfitArray();
                setLoadedArray(data || []);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        loadOutfitData();
    }, []);

    return (
    <View style={{flex:1, backgroundColor:"white"}}>
    <ScrollView>
        <View style={{flexDirection:"row", alignSelf:"center", flexWrap:"wrap", width:halfWidth * 2 + 20}}>
            {loadedArray.map((item, index) => (
                <Outfit key={index} item={item} removeOutfit={removeOutfit} />
            ))}
        </View>
    </ScrollView>
    <BottomThreeButtons></BottomThreeButtons>
    </View>
    );
}

export default SavedOutfits;
