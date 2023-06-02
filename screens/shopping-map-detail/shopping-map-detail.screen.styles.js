import { StyleSheet } from 'react-native';
import {
  borderColor,
  darkColor,
  darker425,
  errorColor,
} from '../../shared/styles';

export const ShoppingMapDetailScreenStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: darkColor,
    marginTop: 15,
  },
  grid: {
    flexDirection: 'column',
  },
  gridRow: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 60,
  },
  gridCol: {
    flex: 1,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: 'auto',
    flexGrow: 1,
    flexShrink: 1,
    borderStyle: 'solid',
    borderColor: borderColor,
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    position: 'relative',
  },
  stand: {
    flex: 1,
    backgroundColor: errorColor,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: darker425,
  },
});
