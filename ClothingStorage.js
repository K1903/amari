import AsyncStorage from '@react-native-async-storage/async-storage';

class ClothingStorage {
    clothingArray;
    storageKey;

    constructor() {
        this.storageKey = 'clothingData';
        this.clothingArray = [];
    }

    async loadClothingArray() {
        try {
            const data = await AsyncStorage.getItem(this.storageKey);
            if (data !== null) {
                this.clothingArray = JSON.parse(data);
            }
            return this.clothingArray;
        } catch (error) {
            console.error('Error loading clothing data:', error);
            throw error;
        }
    }

    async store(clothingItem) {
        this.clothingArray.push(clothingItem);
        console.log(this.clothingArray);
        await this.saveClothingArray();
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