import { axios } from 'api';
import { persistor } from 'index';
import {
  TOKEN_REFRESH_URL,
  SIGN_IN_URL,
  LOGOUT_URL,
  FIRST_LOGIN_URL,
} from './requests';

// 만료 시간 (밀리초)
const ACCESS_EXPIRY_TIME = 2 * 60 * 60 * 1000; // 2시간
const REFRESH_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24시간

const setAxiosHeaderAuth = (value) =>
  (axios.defaults.headers.common['Authorization'] = value);

const signInSuccess = (response) => {
  setAxiosHeaderAuth(response.headers.authorization);

  // accessToken 만료하기 1분 전에 로그인 연장
  setTimeout(authApi.refreshToken, ACCESS_EXPIRY_TIME - 60000);
};

const refreshUserData = () => {
  setAxiosHeaderAuth();
  purge();
};

const purge = async () => {
  await persistor.purge();
};

const authApi = {
  signIn: (params) => {
    return new Promise((resolve, reject) => {
      return axios
        .post(SIGN_IN_URL, params)
        .then((response) => {
          signInSuccess(response);
          // refresh token 만료되면 로그아웃
          setTimeout(authApi.logout, REFRESH_EXPIRY_TIME);
          return resolve(response);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  },
  refreshToken: () => {
    return new Promise((resolve) => {
      return axios
        .get(TOKEN_REFRESH_URL)
        .then((response) => {
          signInSuccess(response);
          return resolve();
        })
        .catch(() => authApi.logout());
    });
  },
  logout: () => {
    return new Promise((resolve, reject) => {
      return axios
        .post(LOGOUT_URL)
        .then(() => resolve())
        .catch((error) => reject(error))
        .finally(() => {
          refreshUserData();
          // window.location.reload(true);
        });
    });
  },
  firstLogin: (params) => {
    return new Promise((resolve, reject) => {
      return axios
        .patch(FIRST_LOGIN_URL, params)
        .then((response) => resolve(response.data.data))
        .catch((error) => reject(error));
    });
  },
};

export default authApi;
