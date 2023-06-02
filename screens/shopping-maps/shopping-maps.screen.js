import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableWithoutFeedback, View } from 'react-native';
import { get } from '../../shared/api';
import styles from '../../shared/styles';
import ShoppingMapStatusBarComponent from '../../components/shopping-map-status-bar.component';
import { useNetInfo } from '@react-native-community/netinfo';
import {
  MAPS_KEY,
  retrieveFromLocalStorage,
  saveToLocalStorage,
} from '../../shared/local-storage';
import { offlineAlert } from '../../shared/utils';
import { PRIVATE_MAPS_ENDPOINT } from '../../shared/endpoints';

const ShoppingMapsScreen = ({ navigation }) => {
  const [maps, setMaps] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const netInfo = useNetInfo();
  useEffect(() => {
    if (netInfo.isConnected) {
      getShoppingMaps(setMaps, setRefreshing, false);
    } else {
      getShoppingMapsFromStorage(setMaps);
    }
  }, [netInfo]);
  const onRefresh = () => {
    netInfo.isConnected
      ? getShoppingMaps(setMaps, setRefreshing, true)
      : offlineAlert(
          'The data will be downloaded automatically when you are online.',
        );
  };

  const listItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('MapDetail', { mapId: item.id });
        }}>
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.body}>
      <ShoppingMapStatusBarComponent />
      <FlatList
        data={maps}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={listItem}
      />
    </View>
  );
};

const getShoppingMapsFromStorage = (setMaps) => {
  retrieveFromLocalStorage(MAPS_KEY, setMaps);
};

const saveShoppingMapsToStorage = (maps) => {
  saveToLocalStorage(MAPS_KEY, maps);
};

const getShoppingMaps = (setMaps, setRefreshing, isManualRefresh) => {
  if (isManualRefresh) {
    setRefreshing(true);
  }
  get(PRIVATE_MAPS_ENDPOINT)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Unable to get maps');
      }
    })
    .then((result) => {
      setMaps(result);
      saveShoppingMapsToStorage(result);
      if (isManualRefresh) {
        setRefreshing(false);
      }
    })
    .catch(console.log);
};

export default ShoppingMapsScreen;
