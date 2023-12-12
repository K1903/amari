import AsyncStorage from '@react-native-async-storage/async-storage';

class OutfitStorage {
    outfitArray;
    storageKey;

    constructor() {
        this.storageKey = 'outfitData';
        this.outfitArray = [];
    }

    async loadOutfitArray() {
        try {
            const data = await AsyncStorage.getItem(this.storageKey);
            if (data !== null) {
                this.outfitArray = JSON.parse(data);
            }
            return this.outfitArray;
        } catch (error) {
            console.error('Error loading outfit data:', error);
            throw error;
        }
    }

    async store(outfit) {
        this.outfitArray.push(outfit);
        console.log(this.outfitArray);
        await this.saveOutfitArray();
    }

    async remove(outfit) {
        let found = [];
        for (let i = 0; i < this.outfitArray.length; i++){
            const outfitToCheck = this.outfitArray[i];
            if (outfitToCheck.length === outfit.length){
                for (let j = 0; j < outfit.length; j++){
                    if (outfitToCheck[j].Name !== outfit[j].Name){
                        break;
                    }
                    if (j === outfit.length - 1){
                        found = outfitToCheck;
                    }
                }
            }
        }
        this.outfitArray = this.outfitArray.filter(item => item !== found);
        await this.saveOutfitArray();
    }

    async saveOutfitArray() {
        try {
            const jsonString = JSON.stringify(this.outfitArray, null, 2);
            await AsyncStorage.setItem(this.storageKey, jsonString);
        } catch (error) {
            console.error('Error saving outfit data:', error);
        }
    }
}

export default OutfitStorage;