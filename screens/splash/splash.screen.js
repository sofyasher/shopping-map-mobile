import React from 'react';
import { Text, View } from 'react-native';
import { SplashScreenStyles } from './splash.screen.styles';

const SplashScreen = () => {
  return (
    <View style={SplashScreenStyles.body}>
      <Text style={SplashScreenStyles.text}>Loading...</Text>
    </View>
  );
};

export default SplashScreen;
