import axios from 'axios';
import { authApi } from 'api';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let isTokenRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = () => {
  refreshSubscribers.map((callback) => callback());
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

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
  async (error) => {
    console.error(new Error(error));
    if (!Object.prototype.hasOwnProperty.call(error, 'response')) {
      return Promise.reject({ status: error.code, message: error.message });
    }
    const { config } = error;
    const { status, message } = error.response.data;
    const originalRequest = config;
    if (status === 401) {
      if (!isTokenRefreshing) {
        // isTokenRefreshing이 false인 경우에만 token refresh 요청
        isTokenRefreshing = true;
        await authApi.refreshToken();
        isTokenRefreshing = false;
        // 새로운 토큰으로 지연되었던 요청 진행
        onTokenRefreshed();
      }
      // token이 재발급 되는 동안의 요청은 refreshSubscribers에 저장
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber(() => {
          resolve(instance(originalRequest));
        });
      });
      return retryOriginalRequest;
    }

    return Promise.reject({ status, message });
  }
);

export default instance;
