import React from 'react';
import { StatusBar } from 'react-native';
import { statusBarColor } from '../shared/styles';

const ShoppingMapStatusBarComponent = () => {
  return (
    <StatusBar
      translucent={true}
      barStyle="light-content"
      backgroundColor={statusBarColor}
    />
  );
};

export default ShoppingMapStatusBarComponent;
