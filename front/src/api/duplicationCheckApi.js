import axios from './axios';
import {
  DUPLICATION_CHECK_NICKNAME_URL,
  DUPLICATION_CHECK_EMAIL_URL,
} from './requests';

export const dupilicationCheckNickName = (nickName) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(DUPLICATION_CHECK_NICKNAME_URL, { nickName })
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

export const dupilicationCheckEmail = (email) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(DUPLICATION_CHECK_EMAIL_URL, { email })
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
