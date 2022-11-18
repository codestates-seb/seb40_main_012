import axios from './axios';
import { TOKEN_REFRESH_URL } from './requests';

export const refreshToken = () => {
  return new Promise((resolve, reject) => {
    return axios
      .get(TOKEN_REFRESH_URL)
      .then((response) => {
        axios.defaults.headers.common['Authorization'] =
          response.headers.authorization;
        resolve('success');
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
