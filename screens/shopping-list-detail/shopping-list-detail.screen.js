import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import styles from '../../shared/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { getIconClassArray } from '../../shared/utils';
import ShoppingMapStatusBarComponent from '../../components/shopping-map-status-bar.component';
import { retrieveListItemsFromLocalStorage } from '../../shared/local-storage';

const ShoppingListDetailScreen = ({ navigation, route }) => {
  const { listId } = route.params;
  const [items, setItems] = useState(null);
  useEffect(() => {
    retrieveListItemsFromLocalStorage(listId, setItems);
  }, [listId]);
  const listItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={styles.iconContainer}>
          <FontAwesomeIcon
            icon={getIconClassArray(item.icon)}
            style={styles.icon}
          />
        </View>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.body}>
      <ShoppingMapStatusBarComponent />
      {items?.length > 0 ? (
        <FlatList data={items} renderItem={listItem} />
      ) : (
        <Text>The list is empty</Text>
      )}
    </View>
  );
};

export default ShoppingListDetailScreen;
