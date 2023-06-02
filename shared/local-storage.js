import AsyncStorage from '@react-native-async-storage/async-storage';
import CookieManager from '@react-native-cookies/cookies';

export const LISTS_KEY = '@lists';
export const MAPS_KEY = '@maps';
export const PROFILE_KEY = '@profile';
export const TOKEN_KEY = '@token';

export const retrieveFromLocalStorage = (key, setFunc) => {
  AsyncStorage.getItem(key).then((string) => setFunc(JSON.parse(string)));
};

export const retrieveListItemsFromLocalStorage = (listId, setFunc) => {
  AsyncStorage.getItem(LISTS_KEY).then((string) => {
    const items = JSON.parse(string).find((elem) => elem.id == listId).items;
    setFunc(items);
  });
};

export const retrieveMapDetailFromLocalStorage = (mapId): Promise<any> => {
  return AsyncStorage.getItem(MAPS_KEY).then((string) => {
    const map = JSON.parse(string).find((elem) => elem.id == mapId);
    return Promise.resolve(map);
  });
};

export const saveToLocalStorage = (key, content, stringify = true) => {
  if (stringify) {
    AsyncStorage.setItem(key, JSON.stringify(content));
  } else {
    AsyncStorage.setItem(key, content);
  }
};

export const saveAuthToken = (url) => {
  return CookieManager.get(url).then((result) => {
    saveToLocalStorage(TOKEN_KEY, result.token.value, false);
  });
};

export const getAuthToken = () => {
  return AsyncStorage.getItem(TOKEN_KEY);
};

export const removeAuthToken = () => {
  return AsyncStorage.removeItem(TOKEN_KEY);
};
