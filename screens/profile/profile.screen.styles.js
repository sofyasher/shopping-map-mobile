import { StyleSheet } from 'react-native';
import { dangerColor, darkColor } from '../../shared/styles';

export const ProfileScreenStyles = StyleSheet.create({
  picture: {
    borderRadius: 100,
    width: 200,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  logOutContainer: {
    flexDirection: 'row',
    backgroundColor: dangerColor,
    color: darkColor,
    height: 30,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 15,
  },
});
