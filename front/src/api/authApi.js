import axios from './axios';
import { persistor } from '../index';
import { TOKEN_REFRESH_URL, SIGN_IN_URL, LOGOUT_URL } from './requests';

const setAxiosHeaderAuth = (value) =>
  (axios.defaults.headers.common['Authorization'] = value);

export const signIn = (params) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(SIGN_IN_URL, params)
      .then((response) => {
        setAxiosHeaderAuth(response.headers.authorization);
        resolve(response);
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

export const refreshToken = () => {
  return new Promise((resolve, reject) => {
    return axios
      .get(TOKEN_REFRESH_URL)
      .then((response) => {
        setAxiosHeaderAuth(response.headers.authorization);
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

export const logout = () => {
  return new Promise((resolve, reject) => {
    return axios
      .post(LOGOUT_URL)
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
      })
      .finally(() => {
        setAxiosHeaderAuth();
        purge();
      });
  });
};

const purge = async () => {
  await persistor.purge();
};
