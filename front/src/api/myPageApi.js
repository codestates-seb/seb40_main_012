import { axios } from 'api';
import {
  USER_INFO_URL,
  CURRENT_PASSWORD_CHECK_URL,
  PASSWORD_UPDATE_URL,
  MY_PAGE_URL,
} from './requests';

const myPageApi = {
  getUserInfo: () => {
    return new Promise((resolve, reject) => {
      return axios
        .get(USER_INFO_URL)
        .then((response) => {
          if (response.data) return resolve(response.data);
          return reject();
        })
        .catch((error) => reject(error));
    });
  },
  currentPasswordCheck: (password) => {
    return new Promise((resolve, reject) => {
      return axios
        .post(CURRENT_PASSWORD_CHECK_URL, { password })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  passwordUpdate: (password) => {
    return new Promise((resolve, reject) => {
      return axios
        .patch(PASSWORD_UPDATE_URL, { password })
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  },
  withdrawal: () => {
    return new Promise((resolve, reject) => {
      return axios
        .delete(MY_PAGE_URL)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  },
  patchUserInfo: (params) => {
    params.gender = params.gender || 'NONE';
    params.age = params.age || 'NONE';

    return new Promise((resolve, reject) => {
      return axios
        .patch(USER_INFO_URL, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
};

export default myPageApi;
