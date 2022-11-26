import axios from './axios';
import {
  USER_INFO_URL,
  CURRENT_PASSWORD_CHECK_URL,
  PASSWORD_UPDATE_URL,
  MY_PAGE_URL,
} from './requests';

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

export const passwordUpdateApi = (password) => {
  return new Promise((resolve, reject) => {
    return axios
      .patch(PASSWORD_UPDATE_URL, { password })
      .then(() => {
        resolve();
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

export const withdrawalApi = () => {
  return new Promise((resolve, reject) => {
    return axios
      .delete(MY_PAGE_URL)
      .then(() => {
        resolve();
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

export const patchUserInfoApi = (params) => {
  params.gender = params.gender || 'NONE';
  params.age = params.age || 'NONE';

  return new Promise((resolve, reject) => {
    return axios
      .patch(USER_INFO_URL, params)
      .then((response) => {
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
