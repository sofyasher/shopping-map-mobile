import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/profile/profile.screen';
import ShoppingListsScreen from '../screens/shopping-lists/shopping-lists.screen';
import ShoppingListDetailScreen from '../screens/shopping-list-detail/shopping-list-detail.screen';
import ShoppingMapsScreen from '../screens/shopping-maps/shopping-maps.screen';
import ShoppingMapDetailScreen from '../screens/shopping-map-detail/shopping-map-detail.screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import styles, { darkColor, primaryColor } from '../shared/styles';

const screenOptions = {
  headerStyle: {
    backgroundColor: darkColor,
    height: 100,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    color: '#fff',
  },
};

const ProfileStack = createNativeStackNavigator();
export const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator screenOptions={screenOptions}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </ProfileStack.Navigator>
  );
};

const ListsStack = createNativeStackNavigator();
export const ListsStackScreen = () => {
  return (
    <ListsStack.Navigator screenOptions={screenOptions}>
      <ListsStack.Screen
        name="Lists"
        component={ShoppingListsScreen}
        options={{ title: 'My lists' }}
      />
      <ListsStack.Screen
        name="ListDetail"
        component={ShoppingListDetailScreen}
        options={{ title: 'List detail' }}
      />
    </ListsStack.Navigator>
  );
};

const MapsStack = createNativeStackNavigator();
export const MapsStackScreen = () => {
  return (
    <MapsStack.Navigator screenOptions={screenOptions}>
      <MapsStack.Screen
        name="Maps"
        component={ShoppingMapsScreen}
        options={{ title: 'My maps' }}
      />
      <MapsStack.Screen
        name="MapDetail"
        component={ShoppingMapDetailScreen}
        options={{ title: 'Map detail' }}
      />
    </MapsStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
export const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'ListsTab':
              iconName = focused ? ['fas', 'list-alt'] : ['far', 'list-alt'];
              break;
            case 'MapsTab':
              iconName = focused ? ['fas', 'map'] : ['far', 'map'];
              break;
            case 'ProfileTab':
              iconName = focused ? ['fas', 'user'] : ['far', 'user'];
              break;
            default:
              iconName = ['fas', 'question'];
              break;
          }

          return <FontAwesomeIcon icon={iconName} style={styles.iconTabBar} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: primaryColor,
        tabBarStyle: {
          backgroundColor: darkColor,
        },
      })}>
      <Tab.Screen
        name="ListsTab"
        component={ListsStackScreen}
        options={{ title: 'My lists' }}
      />
      <Tab.Screen
        name="MapsTab"
        component={MapsStackScreen}
        options={{ title: 'My maps' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export const RootStack = createNativeStackNavigator();
