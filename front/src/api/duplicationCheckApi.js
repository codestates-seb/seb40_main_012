import { axios } from 'api';
import {
  DUPLICATION_CHECK_NICKNAME_URL,
  DUPLICATION_CHECK_EMAIL_URL,
} from './requests';

const duplicationCheckApi = {
  dupilicationCheckNickName: (nickName) => {
    return new Promise((resolve, reject) => {
      return axios
        .post(DUPLICATION_CHECK_NICKNAME_URL, { nickName })
        .then((response) => {
          if (response.data) return resolve(response.data);
          return reject();
        })
        .catch((error) => reject(error));
    });
  },
  dupilicationCheckEmail: (email) => {
    return new Promise((resolve, reject) => {
      return axios
        .post(DUPLICATION_CHECK_EMAIL_URL, { email })
        .then((response) => {
          if (response.data) return resolve(response.data);
          return reject();
        })
        .catch((error) => reject(error));
    });
  },
};

export default duplicationCheckApi;
