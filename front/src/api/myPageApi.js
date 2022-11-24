import axios from './axios';
import { USER_INFO } from './requests';

export const getUserInfoApi = () => {
  return new Promise((resolve, reject) => {
    return axios
      .get(USER_INFO)
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
