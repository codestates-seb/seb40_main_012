import axios from './axios';
import { USER_INFO_URL, CURRENT_PASSWORD_CHECK_URL } from './requests';

export const getUserInfoApi = () => {
  return new Promise((resolve, reject) => {
    return axios
      .get(USER_INFO_URL)
      .then((response) => {
        if (response.data) resolve(response.data);
        reject();
      })
      .catch((error) => {
        if (Object.prototype.hasOwnProperty.call(error, 'response')) {
          const { status, message } = error.response.data;
          reject({ status, message });
        } else {
          reject({ status: error.code, message: error.message });
        }
      });
  });
};

export const currentPasswordCheckApi = (password) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(CURRENT_PASSWORD_CHECK_URL, { password })
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        if (Object.prototype.hasOwnProperty.call(error, 'response')) {
          const { status, message } = error.response.data;
          reject({ status, message });
        } else {
          reject({ status: error.code, message: error.message });
        }
      });
  });
};
