import axios from 'axios';
// import { authApi } from 'api';
// import {
//   TOKEN_REFRESH_URL,
//   LOGOUT_URL,
//   USERS_URL,
//   SIGN_IN_URL,
// } from './requests';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('accessToken'),
  },
  withCredentials: true,
});

// let isTokenRefreshing = false;
// let refreshSubscribers = [];

// const addRefreshSubscriber = (callback) => {
//   refreshSubscribers.push(callback);
// };

// const onTokenRefreshed = () => {
//   refreshSubscribers.map((callback) => callback());
//   refreshSubscribers = [];
// };

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!Object.prototype.hasOwnProperty.call(error, 'response')) {
      return Promise.reject({
        error,
        status: error.code,
        message: error.message,
      });
    }
    const { status, message } = error.response.data;
    return Promise.reject({ error, status, message });

    // const { config } = error;
    // const originalRequest = config;

    // if (
    //   config.url === TOKEN_REFRESH_URL ||
    //   config.url === LOGOUT_URL ||
    //   config.url === USERS_URL ||
    //   config.url === SIGN_IN_URL ||
    //   status !== 401
    // ) {
    //   return Promise.reject({ error, status, message });
    // }

    // if (!isTokenRefreshing) {
    //   // isTokenRefreshing이 false인 경우에만 token refresh 요청
    //   isTokenRefreshing = true;
    //   authApi
    //     .refreshToken()
    //     .then(() => {
    //       isTokenRefreshing = false;
    //       // 새로운 토큰으로 지연되었던 요청 진행
    //       onTokenRefreshed();
    //     })
    //     .catch(() => {
    //       isTokenRefreshing = false;
    //     })
    //     .finally(() => {});
    // }

    // // token이 재발급 되는 동안의 요청은 refreshSubscribers에 저장
    // const retryOriginalRequest = new Promise((resolve) => {
    //   addRefreshSubscriber(() => {
    //     resolve(instance(originalRequest));
    //   });
    // });
    // return retryOriginalRequest;
  }
);

export default instance;
