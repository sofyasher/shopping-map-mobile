import { StyleSheet } from 'react-native';
import { cardBg, darkColor } from '../../shared/styles';

export const SplashScreenStyles = StyleSheet.create({
  body: {
    backgroundColor: cardBg,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 36,
    color: darkColor,
  },
});
