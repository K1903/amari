import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomThreeButtons } from '../BottomThreeButtons';
import ClothingStorage from '../ClothingStorage';

function Closet(props) {
    const [loadedArray, setLoadedArray] = useState([]);

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
        },
        lastHorizScroll: {
            height: 200,
            paddingVertical: 200,
        },
        imageStyle: {
            width: 100, // Adjust the width as needed
            height: 100, // Adjust the height as needed
            marginHorizontal: 5,
        },
    });

    const renderCategory = (category, images) => (
        <View key={category}>
            <Text style={styles.headerText}>{category}</Text>
            <ScrollView horizontal={true} style={styles.horizScroll}>
                {images.map((image, index) => (
                    <Image key={index} source={{ uri: image.Image.uri }} style={styles.imageStyle} />
                ))}
            </ScrollView>
        </View>
    );

    return (
        <View style={{ backgroundColor: 'white' }}>
            <ScrollView style={{ paddingTop: 100 }}>
                {/* Render each category */}
                {renderCategory('Belt', loadedArray.filter(item => item.Type === 'Belt'))}
                {renderCategory('Hat', loadedArray.filter(item => item.Type === 'Hat'))}
                {renderCategory('Jacket', loadedArray.filter(item => item.Type === 'Jacket'))}
                {renderCategory('Pants', loadedArray.filter(item => item.Type === 'Pants'))}
                {renderCategory('Shirt', loadedArray.filter(item => item.Type === 'Shirt'))}
                {renderCategory('Shoes', loadedArray.filter(item => item.Type === 'Shoes'))}
                {renderCategory('Accessory', loadedArray.filter(item => item.Type === 'Accessory'))}
            </ScrollView>
            <View style={{ position: 'absolute', bottom: '5%', left: 0, right: 0 }}>
                <BottomThreeButtons />
            </View>
        </View>
    );
}

export default Closet;