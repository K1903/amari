import {Dimensions, Image, ScrollView, Text, TextInput, TouchableHighlight, View} from "react-native";
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

    const outfit = props.item;
    const removeOutfit = props.removeOutfit;
    const [editableText, setEditableText] = useState('Outfit Name');

    const navigation = useNavigation();

    const addLiveFitting = () => {
        navigation.navigate("VideoScreen");
    }

    const playbackFitting = () => {
        navigation.navigate("PlayBackScreen");
    }

    const handleTextChange = (text) => {
        setEditableText(text);
    };


    return (
        <View>
            <TouchableHighlight 
                style={{ borderWidth: 1.5, width: 55, height: 25, alignSelf: "center", alignItems: "center", justifyContent: "center" }}
                underlayColor={"#bfbfbf"}
                onPress={() => removeOutfit(outfit)}>
                <Text>Remove</Text>
            </TouchableHighlight>
            <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
                <TouchableHighlight onPress={() => playbackFitting()}>
                    <Image source={require("../assets/PixelArmoire.png")} height={halfWidth - 20} width={halfWidth - 20} ></Image>
                </TouchableHighlight>
                {Array.isArray(outfit) && outfit.map((clothingItem, index) => (
                    <View key={index} style={{ marginRight: 10 }}>
                        <Image
                            source={{ uri: clothingItem.Image.uri }}
                            style={{ height:halfWidth - 20, width:halfWidth - 20, borderRadius: 10 }}
                        />
                    </View>
                ))}
            </ScrollView>

            <TextInput
                style={{borderWidth: 1, borderColor: '#ccc', padding: 10, fontSize: 16,}}
                value={editableText}
                onChangeText={handleTextChange}
                placeholder="Type here..."
            />
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
    const outfitStorage = new OutfitStorage();

    const removeOutfit = async (outfit) => {
        try {
            await outfitStorage.loadOutfitArray();
          await outfitStorage.remove(outfit);
          const data = outfitStorage.outfitArray;
          setLoadedArray(data || []);
        } catch (error) {
          console.error('Error removing outfit:', error);
        }
      };

    const loadOutfitData = async () => {
            try {
                const data = await outfitStorage.loadOutfitArray();
                setLoadedArray(data || []);
            } catch (error) {
                console.error('Error:', error);
            }
    };

    loadOutfitData();

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
