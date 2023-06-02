const HOST = 'https://shopping-map.sherstneva.cz';
export const API_URL = HOST + '/api';
export const FILES_URL = HOST + '/files/';

export async function get(url, data = {}) {
  return fetch(API_URL + url, { method: 'GET', ...data });
}

export async function getProfilePicture(fileName) {
  return fetch(FILES_URL + fileName, { method: 'GET' });
}

export async function post(url, formdata, headers = {}) {
  return fetch(API_URL + url, {
    method: 'POST',
    headers: headers,
    body: formdata,
  });
}

export async function postWithoutBody(url, headers = {}) {
  return fetch(API_URL + url, {
    method: 'POST',
    headers: headers,
  });
}
