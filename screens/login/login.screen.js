import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles, { dangerColor, darkColor } from '../../shared/styles';
import { LoginScreenStyles } from './login.screen.styles';
import codePush from 'react-native-code-push';
import { offlineAlert } from '../../shared/utils';
import { UPDATE_CONFIG } from '../../shared/code-push';
import ShoppingMapStatusBarComponent from '../../components/shopping-map-status-bar.component';
import { useNetInfo } from '@react-native-community/netinfo';
import { AuthContext } from '../../shared/store/auth/auth-context';
import { logIn } from '../../shared/store/auth/auth-effects';

const LoginScreen = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [login, onChangeLogin] = useState('');
  const [password, onChangePassword] = useState('');
  const [emptyUsername, onEmptyUsername] = useState(true);
  const [emptyPassword, onEmptyPassword] = useState(true);
  const netInfo = useNetInfo();

  const onLoginChange = (login) => {
    onChangeLogin(login);
    onEmptyUsername(login === '');
  };
  const onPasswordChange = (password) => {
    onChangePassword(password);
    onEmptyPassword(password === '');
  };
  const onSubmit = () => {
    if (netInfo.isConnected) {
      logIn(login, password, dispatch);
    } else {
      offlineAlert('Please turn on Wi-Fi or mobile data on your device.');
    }
  };

  return (
    <>
      {!state.isLoginInProgress ? (
        <KeyboardAvoidingView
          behavior="height"
          style={[LoginScreenStyles.loginPage]}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={LoginScreenStyles.loginPageInner}>
              <ShoppingMapStatusBarComponent />
              <View style={LoginScreenStyles.form}>
                <Text style={styles.text}>
                  Welcome to Shopping Map! {'\n'} Please log in first.
                </Text>
                <TextInput
                  placeholder="Enter login"
                  placeholderTextColor={darkColor}
                  style={styles.input}
                  defaultValue={login}
                  onChangeText={onLoginChange}
                />
                <TextInput
                  placeholder="Enter password"
                  placeholderTextColor={darkColor}
                  style={styles.input}
                  secureTextEntry={true}
                  defaultValue={password}
                  onChangeText={onPasswordChange}
                />
                <Error error={state.error} />
                <TouchableOpacity
                  style={styles.button}
                  disabled={emptyUsername || emptyPassword}
                  onPress={onSubmit}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      ) : (
        <View
          style={[
            LoginScreenStyles.loginPage,
            LoginScreenStyles.progressCircleContainer,
          ]}>
          <ShoppingMapStatusBarComponent />
          <ActivityIndicator size="large" color={dangerColor} />
        </View>
      )}
    </>
  );
};

const Error = ({ error }) => {
  return error?.code !== 200 ? (
    <Text style={LoginScreenStyles.error}>{error?.error}</Text>
  ) : null;
};

const checkUpdatesAndInstall = () => {
  codePush.sync(UPDATE_CONFIG).then((result) => {
    let text = '';
    switch (result) {
      case 0:
        text = 'The app is up to date';
        break;
      case 1:
        text = 'The update has been installed';
        break;
      case 2:
        text = 'The update has been ignored';
        break;
      case 3:
        text = 'The update coudln`t be installed';
        break;
      case 4:
      case 5:
        text = 'The sync is in progress';
        break;
      default:
        text = 'Update is in progress';
        break;
    }

    Alert.alert('Update info', text);
  });
};

export default LoginScreen;
