import md5 from 'md5';
import { axios } from 'api';
import { USERS_URL } from './requests';

const signUpApi = {
  signUp: (params) => {
    params.profileImage = `http://gravatar.com/avatar/${md5(
      params.email.toLowerCase()
    )}?d=identicon`;

    return new Promise((resolve, reject) => {
      return axios
        .post(USERS_URL, params)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  },
};

export default signUpApi;
