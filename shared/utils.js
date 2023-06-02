import { Alert } from 'react-native';

export const getIconClassArray = (icon) => {
  if (icon === null) {
    return ['fas', 'question'];
  }
  icon = icon.replace('fa-', '');
  return icon.split(' ').map(String);
};
export const offlineAlert = (message) => {
  Alert.alert('You are offline', message);
};
