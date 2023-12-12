import React, { useEffect, useMemo, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { BottomThreeButtons } from '../BottomThreeButtons';
import ClothingStorage from '../ClothingStorage';
import ScreenContext from '../Contexts/ScreenContext';
import { useContext } from 'react';
import OutfitStorage from "../OutfitStorage";

function Closet(props) {
    const [loadedClothingArray, setLoadedClothingArray] = useState([]);
    const [screen, setScreen] = useContext(ScreenContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [itemToDel, setItemToDel] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [allOutfits, setAllOutfits] = useState([]);
    

    useEffect( () => {
        const loadClothingData = async () => {
            try {
                const clothingStorage = new ClothingStorage();
                const data = await clothingStorage.loadClothingArray();
                setLoadedClothingArray(data || []);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        loadClothingData();
    }, []);

    const styles = StyleSheet.create({
        headerText: {
            fontSize: 25,
            paddingLeft: 25,
            fontWeight: 'bold',
        },
        horizScroll: {
            height: 200,
            marginBottom: 10
        },
        lastHorizScroll: {
            height: 200,
            marginBottom:250
        },
        imageStyle: {
            width: 200,
            height: 200,
            marginHorizontal: 5,
        },
        selectedImageStyle: {
            opacity: 0.5,
        },
        makeOutfitButtonHalf: {
            borderWidth: 1.5,
            borderRadius: 10,
            width: 150,
            height: 70,
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: 20,
            backgroundColor: '#4CAF50',
            opacity: 0.5,
        },
        makeOutfitButtonFull: {
            opacity: 1,
        },
    });

    const handleMakeOutfit = async () => {
        if (selectedImages.length < 2){
            alert("Select 2 or More Articles of Clothing");
        } else {
            const outfitStorage = new OutfitStorage();
            await outfitStorage.loadOutfitArray();
            const outfit = selectedImages;
            await outfitStorage.store(outfit);
            alert("Outfit Saved");
            console.log("Outfit saved: " + outfit);
            console.log(outfitStorage.outfitArray);
            setSelectedImages([]);
        }
    };


    const handleImagePress = (image) => {
        setSelectedImages((prevSelected) => {
            if (prevSelected.includes(image)) {
                return prevSelected.filter((selectedImage) => selectedImage !== image);
            } else {
                return [...prevSelected, image];
            }
        });
    };


    const renderCategory = (category, images) => (
        <View key={category}>
            <Text style={styles.headerText}>{category}</Text>
            <ScrollView horizontal={true} style={category === "Accessory" ? styles.lastHorizScroll : styles.horizScroll}>
                {images.map((image, index) => (
                    <TouchableOpacity key={index} onLongPress={() => openModal(image)} onPress={() => handleImagePress(image)}>
                        <Image source={{ uri: image.Image.uri }} style={[styles.imageStyle,
                                   selectedImages.includes(image) && styles.selectedImageStyle,
                               ]} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    function openModal(item) {
        setModalVisible(true);
        setItemToDel(item);
    }

    function closeModal() {
        setModalVisible(false);
        setItemToDel(null);
    }

    async function deleteItem() {
        await clothingStorage.loadClothingArray();
        await clothingStorage.remove(itemToDel);
        const data = await clothingStorage.loadClothingArray();
        setLoadedArray(data || []);
        closeModal();
        alert("Item successfully deleted")
    }

    return (
        <View style={{backgroundColor: "white"}}>
            <TouchableHighlight
                style={[styles.makeOutfitButtonHalf,
                    selectedImages.length > 1 && styles.makeOutfitButtonFull,]}
                underlayColor={"#bfbfbf"}
                onPress={handleMakeOutfit}
            >
                <Text style={{ fontWeight: 600 }}>Make Outfit</Text>
            </TouchableHighlight>

            <ScrollView style={{paddingTop: 10}}>
                {renderCategory('Belts', loadedClothingArray.filter(item => item.Type === 'Belt' && item.Season.toLowerCase().includes(screen)))}
                {renderCategory('Hats', loadedClothingArray.filter(item => item.Type === 'Hat' && item.Season.toLowerCase().includes(screen)))}
                {renderCategory('Jackets', loadedClothingArray.filter(item => item.Type === 'Jacket' && item.Season.toLowerCase().includes(screen)))}
                {renderCategory('Pants', loadedClothingArray.filter(item => item.Type === 'Pants' && item.Season.toLowerCase().includes(screen)))}
                {renderCategory('Shirts', loadedClothingArray.filter(item => item.Type === 'Shirt' && item.Season.toLowerCase().includes(screen)))}
                {renderCategory('Shoes', loadedClothingArray.filter(item => item.Type === 'Shoes' && item.Season.toLowerCase().includes(screen)))}
                {renderCategory('Accessories', loadedClothingArray.filter(item => item.Type === 'Accessory' && item.Season.toLowerCase().includes(screen)))}
            </ScrollView>
            <Modal visible={modalVisible}>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <View style={{backgroundColor: "white", padding: 20, borderRadius: 10}}>
                        <Text style={{fontSize:18}}>Are you sure you want to delete this item?</Text>
                        <View style={{flexDirection: "row", justifyContent: "space-around", marginTop: 35}}>
                            <TouchableHighlight underlayColor={"#bfbfbf"} style={{borderWidth:1.5, width:120, height:80, justifyContent:"center", alignItems:"center"}} onPress={() => deleteItem()}>
                                <Text style={{fontSize:20}}>Yes</Text>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor={"#bfbfbf"} style={{borderWidth:1.5, width:120, height:80, justifyContent:"center", alignItems:"center"}} onPress={() => closeModal()}>
                                <Text style={{fontSize:20}}>No</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={{ position: 'absolute', bottom: '5%', left: 0, right: 0 }}>
                <BottomThreeButtons />
            </View>
        </View>
    );
}

export default Closet;