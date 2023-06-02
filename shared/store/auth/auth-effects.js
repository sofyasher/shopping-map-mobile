import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  RESTORE_TOKEN_SUCCESS,
} from './auth-actions';
import { getAuthToken, removeAuthToken } from '../../local-storage';
import { Alert } from 'react-native';
import { isTokenValid, logInRequest, logOutRequest } from './auth-api-requests';

export const processAuthToken: Promise<string | null> = (netInfo, dispatch) => {
  return new Promise((resolve) => {
    getAuthToken().then((token) => {
      if (token) {
        if (netInfo.isConnected) {
          isTokenValid(token).then((result) => {
            if (result) {
              dispatch({
                type: RESTORE_TOKEN_SUCCESS,
                payload: { token: token },
              });
              resolve(token);
            } else {
              dispatch({
                type: RESTORE_TOKEN_SUCCESS,
                payload: { token: null },
              });
              resolve(null);
            }
          });
        } else {
          dispatch({
            type: RESTORE_TOKEN_SUCCESS,
            payload: { token: token },
          });
          resolve(token);
        }
      } else {
        dispatch({ type: RESTORE_TOKEN_SUCCESS, payload: { token: null } });
        resolve(null);
      }
    });
  });
};

export const logIn = (login, password, dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  logInRequest(login, password)
    .then(() => {
      getAuthToken().then((token) => {
        dispatch({ type: LOGIN_SUCCESS, payload: { token: token } });
      });
    })
    .catch((error) => {
      dispatch({ type: LOGIN_ERROR, payload: { error: error } });
    });
};

export const logOut = (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  logOutRequest().then((result) => {
    if (result) {
      removeAuthToken().then(() => dispatch({ type: LOGOUT_SUCCESS }));
    } else {
      dispatch({ type: LOGOUT_ERROR });
      Alert.alert('Unsuccessful logout');
    }
  });
};
