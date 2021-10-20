import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'dataToken';

const storeToken = async data => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log('Error storing the auth token', error);
  }
};

const getToken = async () => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log('Error getting the auth token', error);
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? JSON.parse(token) : null;
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Error removing the auth token', error);
  }
};

export default {getUser, getToken, storeToken, removeToken};
