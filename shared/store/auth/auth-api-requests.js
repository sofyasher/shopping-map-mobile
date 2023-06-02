import { API_URL, post, postWithoutBody } from '../../api';
import {
  CHECK_AUTH_ENDPOINT,
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
} from '../../endpoints';
import { saveAuthToken } from '../../local-storage';

export const isTokenValid: Promise<boolean> = (token) => {
  return new Promise((resolve) => {
    postWithoutBody(CHECK_AUTH_ENDPOINT, { 'Custom-Auth': token })
      .then((response) => {
        if (response.status === 401) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
      .catch(console.log);
  });
};

export const logInRequest: Promise<any> = (login, password) => {
  const formdata = new FormData();
  formdata.append('login', login);
  formdata.append('password', password);

  return new Promise((resolve, reject) => {
    post(LOGIN_ENDPOINT, formdata).then((response) => {
      if (response.ok) {
        saveAuthToken(API_URL + LOGIN_ENDPOINT).then(() => {
          response.json().then((res) => {
            resolve({ code: 200, username: res.name });
          });
        });
      } else {
        response.json().then((res) => {
          reject({ code: response.status, error: res.error });
        });
      }
    });
  });
};

export const logOutRequest: Promise<boolean> = () => {
  return new Promise((resolve) => {
    postWithoutBody(LOGOUT_ENDPOINT)
      .then((response) => {
        if (response.status === 200) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(console.log);
  });
};
