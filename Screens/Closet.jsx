import React, { useEffect, useMemo, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { BottomThreeButtons } from '../BottomThreeButtons';
import ClothingStorage from '../ClothingStorage';
import ScreenContext from '../Contexts/ScreenContext';
import { useContext } from 'react';

function Closet(props) {
    const [loadedArray, setLoadedArray] = useState([]);
    const [screen, setScreen] = useContext(ScreenContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [itemToDel, setItemToDel] = useState(null);
    const clothingStorage = new ClothingStorage();
    

    useEffect( () => {
        const loadClothingData = async () => {
            try {
                const clothingStorage = new ClothingStorage();
                const data = await clothingStorage.loadClothingArray();
                setLoadedArray(data || []);
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
            width: 200, // Adjust the width as needed
            height: 200, // Adjust the height as needed
            marginHorizontal: 5,
        },
    });

    const renderCategory = (category, images) => (
        <View key={category}>
            <Text style={styles.headerText}>{category}</Text>
            <ScrollView horizontal={true} style={category === "Accessory" ? styles.lastHorizScroll : styles.horizScroll}>
                {images.map((image, index) => (
                    <TouchableOpacity key={index} onLongPress={() => openModal(image)}>
                        <Image source={{ uri: image.Image.uri }} style={styles.imageStyle} />
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
            <ScrollView style={{paddingTop: 100}}>
                {/* Render each category */}
                {renderCategory('Belt', loadedArray.filter(item => item.Type === 'Belt' && item.Season.toLowerCase().includes(screen)))}
                {renderCategory('Hat', loadedArray.filter(item => item.Type === 'Hat' && item.Season.toLowerCase().includes(screen)))}
                {renderCategory('Jacket', loadedArray.filter(item => item.Type === 'Jacket' && item.Season.toLowerCase().includes(screen)))}
                {renderCategory('Pants', loadedArray.filter(item => item.Type === 'Pants' && item.Season.toLowerCase().includes(screen)))}
                {renderCategory('Shirt', loadedArray.filter(item => item.Type === 'Shirt' && item.Season.toLowerCase().includes(screen)))}
                {renderCategory('Shoes', loadedArray.filter(item => item.Type === 'Shoes' && item.Season.toLowerCase().includes(screen)))}
                {renderCategory('Accessory', loadedArray.filter(item => item.Type === 'Accessory' && item.Season.toLowerCase().includes(screen)))}
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