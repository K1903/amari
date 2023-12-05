import AsyncStorage from '@react-native-async-storage/async-storage';

class ClothingStorage {
    clothingArray;
    storageKey;

    constructor() {
        this.storageKey = 'clothingData';
        this.clothingArray = [];
        this.loadClothingArray();
    }

    async loadClothingArray() {
        try {
            const data = await AsyncStorage.getItem(this.storageKey);
            if (data !== null) {
                this.clothingArray = JSON.parse(data);
                console.log(this.clothingArray);
            }
        } catch (error) {
            console.error('Error loading clothing data:', error);
        }
    }

    async store(clothingItem) {
        this.clothingArray.push(clothingItem);
        await this.saveClothingArray();
        console.log(this.clothingArray);
    }

    async remove(clothingItem) {
        this.clothingArray = this.clothingArray.filter(item => item !== clothingItem);
        await this.saveClothingArray();
    }

    async saveClothingArray() {
        try {
            const jsonString = JSON.stringify(this.clothingArray, null, 2);
            await AsyncStorage.setItem(this.storageKey, jsonString);
        } catch (error) {
            console.error('Error saving clothing data:', error);
        }
    }
}

export default ClothingStorage;