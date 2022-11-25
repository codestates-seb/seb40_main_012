import md5 from 'md5';
import axios from './axios';
import { USERS_URL } from './requests';

export const signUpApi = (params) => {
  params.profileImage = `http://gravatar.com/avatar/${md5(
    params.email.toLowerCase()
  )}?d=identicon`;
  return axios.post(USERS_URL, params);
};
