import { StyleSheet } from 'react-native';
import { cardBg, errorColor } from '../../shared/styles';

export const LoginScreenStyles = StyleSheet.create({
  loginPage: {
    backgroundColor: cardBg,
    flex: 1,
    alignItems: 'center',
  },
  loginPageInner: {
    padding: 25,
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    paddingTop: 65,
  },
  progressCircleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  versionText: {
    textAlign: 'right',
    marginRight: 45,
  },
  updateIconContainer: {
    textAlign: 'right',
    marginRight: 30,
    marginTop: 30,
  },
  error: {
    paddingLeft: 15,
    color: errorColor,
  },
});
