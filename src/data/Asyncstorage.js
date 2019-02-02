import { AsyncStorage } from 'react-native';
import { constant } from '../config/Constant';

const asyncStorage = {
    saveClientID: saveClientID,
    getClientID: getClientID,
    removeClientID: removeClientID,
    saveCountText: saveCountText,
    getCountText: getCountText,
    saveAccountId: saveAccountId,
    getAccountId: getAccountId,
    removeAccountID: removeAccountID,
    saveNumberText: saveNumberText,
    getNumberText: getNumberText,
    saveNameText: saveNameText,
    getNameText: getNameText,
}

async function saveClientID(value) {
    try {
        await AsyncStorage.setItem(constant.CLIENT, value);
    } catch (error) {
        console.log("Error saving data" + error);
    }
};

async function getClientID() {
    try {
        const value = await AsyncStorage.getItem(constant.CLIENT);
        return value;
    } catch (error) {
        console.log("Error retrieving data" + error);
        return null;
    }
};

async function removeClientID() {
    try {
        await AsyncStorage.removeItem(constant.CLIENT);
    } catch (error) {
        console.log("Error resetting data" + error);
    }
};

async function saveNumberText(value) {
    try {
        await AsyncStorage.setItem(constant.NUMBER, value);
    } catch (error) {
        console.log("Error saving data" + error);
    }
};

async function getNumberText() {
    try {
        const value = await AsyncStorage.getItem(constant.NUMBER);
        return value;
    } catch (error) {
        console.log("Error retrieving data" + error);
        return null;
    }
}

async function saveNameText(value) {
    try {
        await AsyncStorage.setItem(constant.NAME, value);
    } catch (error) {
        console.log("Error saving data" + error);
    }
};

async function getNameText() {
    try {
        const value = await AsyncStorage.getItem(constant.NAME);
        return value;
    } catch (error) {
        console.log("Error retrieving data" + error);
        return null;
    }
}

async function saveCountText(value) {
    try {
        await AsyncStorage.setItem(constant.COUNT, value);
    } catch (error) {
        console.log("Error saving data" + error);
    }
};

async function getCountText() {
    try {
        const value = await AsyncStorage.getItem(constant.COUNT);
        return value;
    } catch (error) {
        console.log("Error retrieving data" + error);
        return null;
    }
};

async function saveAccountId(value) {
    try {
        await AsyncStorage.setItem(constant.ACCID, value);
    } catch (error) {
        console.log("Error saving data" + error);
    }
};

async function getAccountId() {
    try {
        const value = await AsyncStorage.getItem(constant.ACCID);
        return value;
    } catch (error) {
        console.log("Error retrieving data" + error);
        return null;
    }
};

async function removeAccountID() {
    try {
        await AsyncStorage.removeItem(constant.ACCID);
    } catch (error) {
        console.log("Error resetting data" + error);
    }
}
export default asyncStorage;