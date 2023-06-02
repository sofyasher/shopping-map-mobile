import type { AuthActionTypes } from './auth-actions';
import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  RESTORE_TOKEN_SUCCESS,
} from './auth-actions';

export const authReducer = (
  prevState,
  action: { type: AuthActionTypes, payload: any },
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...prevState,
        isLoginInProgress: true,
        isLoading: false,
        isLogoutInProgress: false,
        userToken: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...prevState,
        isLoginInProgress: false,
        isLoading: false,
        isLogoutInProgress: false,
        userToken: action.payload.token,
      };
    case LOGIN_ERROR:
      return {
        ...prevState,
        isLoginInProgress: false,
        isLoading: false,
        userToken: null,
        error: action.payload.error,
      };
    case LOGOUT_REQUEST:
      return {
        ...prevState,
        isLogoutInProgress: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...prevState,
        isLogoutInProgress: false,
        userToken: null,
      };
    case LOGOUT_ERROR:
      return {
        ...prevState,
        isLogoutInProgress: false,
        error: action.payload.error,
      };
    case RESTORE_TOKEN_SUCCESS:
      return {
        ...prevState,
        isLoading: false,
        userToken: action.payload.token,
      };
    default:
      return prevState;
  }
};

export const INITIAL_STATE = {
  isLoading: true,
  isLoginInProgress: false,
  isLogoutInProgress: false,
  userToken: null,
  error: null,
};
