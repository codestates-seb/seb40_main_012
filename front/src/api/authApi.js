import axios from './axios';
import { persistor } from '../index';
import { TOKEN_REFRESH_URL, SIGN_IN_URL, LOGOUT_URL } from './requests';

// 만료 시간 (밀리초)
const ACCESS_EXPIRY_TIME = 30 * 60 * 1000; // 30분
const REFRESH_EXPIRY_TIME = 7 * 60 * 60 * 1000; // 7시간(420분)

const setAxiosHeaderAuth = (value) =>
  (axios.defaults.headers.common['Authorization'] = value);

export const signIn = (params) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(SIGN_IN_URL, params)
      .then((response) => {
        signInSuccess(response);
        // refresh token 만료되면 로그아웃
        setTimeout(logout, REFRESH_EXPIRY_TIME);
        resolve(response);
      })
      .catch((error) => {
        if (Object.prototype.hasOwnProperty.call(error, 'response')) {
          const { status, message } = error.response.data;
          reject({ status, message });
        } else {
          reject({ status: error.code, message: error.message });
        }

        // 에러코드 나오면 처리 필요
        // logout();
      });
  });
};

export const refreshToken = () => {
  return new Promise((resolve, reject) => {
    return axios
      .get(TOKEN_REFRESH_URL)
      .then((response) => {
        signInSuccess(response);
        resolve();
      })
      .catch((error) => {
        if (Object.prototype.hasOwnProperty.call(error, 'response')) {
          const { status, message } = error.response.data;
          reject({ status, message });
        } else {
          reject({ status: error.code, message: error.message });
        }

        // 에러코드 나오면 처리 필요
        // logout();
      });
  });
};

const signInSuccess = (response) => {
  setAxiosHeaderAuth(response.headers.authorization);

  // accessToken 만료하기 1분 전에 로그인 연장
  setTimeout(refreshToken, ACCESS_EXPIRY_TIME - 60000);
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
