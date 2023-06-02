import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableWithoutFeedback, View } from 'react-native';
import { get } from '../../shared/api';
import styles from '../../shared/styles';
import ShoppingMapStatusBarComponent from '../../components/shopping-map-status-bar.component';
import { useNetInfo } from '@react-native-community/netinfo';
import {
  LISTS_KEY,
  retrieveFromLocalStorage,
  saveToLocalStorage,
} from '../../shared/local-storage';
import { offlineAlert } from '../../shared/utils';
import { PRIVATE_LISTS_ENDPOINT } from '../../shared/endpoints';

const ShoppingListsScreen = ({ navigation }) => {
  const [lists, setLists] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const netInfo = useNetInfo();
  useEffect(() => {
    if (netInfo.isConnected) {
      getShoppingLists(setLists, setRefreshing, false);
    } else {
      getShoppingListsFromStorage(setLists);
    }
  }, [netInfo]);
  const onRefresh = () => {
    netInfo.isConnected
      ? getShoppingLists(setLists, setRefreshing, true)
      : offlineAlert(
          'The data will be downloaded automatically when you are online.',
        );
  };

  const listItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('ListDetail', { listId: item.id });
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
        data={lists}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={listItem}
      />
    </View>
  );
};

const getShoppingListsFromStorage = (setLists) => {
  retrieveFromLocalStorage(LISTS_KEY, setLists);
};

const saveShoppingListsToStorage = (lists) => {
  saveToLocalStorage(LISTS_KEY, lists);
};

const getShoppingLists = (setLists, setRefreshing, isManualRefresh) => {
  if (isManualRefresh) {
    setRefreshing(true);
  }
  get(PRIVATE_LISTS_ENDPOINT)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Unable to get private lists');
      }
    })
    .then((result) => {
      setLists(result);
      saveShoppingListsToStorage(result);
      if (isManualRefresh) {
        setRefreshing(false);
      }
    })
    .catch(console.log);
};

export default ShoppingListsScreen;
