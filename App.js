/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import type { Node } from 'react';
import React, { useEffect, useReducer } from 'react';
import LoginScreen from './screens/login/login.screen';
import { NavigationContainer } from '@react-navigation/native';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { enableScreens } from 'react-native-screens';
import { LogBox } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import SplashScreen from './screens/splash/splash.screen';
import { AuthContext } from './shared/store/auth/auth-context';
import { authReducer, INITIAL_STATE } from './shared/store/auth/auth-reducer';
import { processAuthToken } from './shared/store/auth/auth-effects';
import { RootStack, Tabs } from './shared/navigation';
import KeepAwake from 'react-native-keep-awake';

library.add(fab, far, fas);
enableScreens();

const App: () => Node = () => {
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  ]);
  const netInfo = useNetInfo();
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  useEffect(() => {
    processAuthToken(netInfo, dispatch);
  }, [netInfo]);

  const authContext = {
    state,
    dispatch,
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {state.isLoading ? (
            <RootStack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken === null ? (
            <RootStack.Screen name="Login" component={LoginScreen} />
          ) : (
            <RootStack.Screen name="Home" component={Tabs} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
      <KeepAwake />
    </AuthContext.Provider>
  );
};

export default App;
