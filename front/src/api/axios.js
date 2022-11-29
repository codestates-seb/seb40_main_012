import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

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
    console.error(error);
    if (!Object.prototype.hasOwnProperty.call(error, 'response')) {
      return Promise.reject({ status: error.code, message: error.message });
    }
    const { status, message } = error.response.data;
    return Promise.reject({ status, message });
  }
);

export default instance;
