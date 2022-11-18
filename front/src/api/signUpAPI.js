import axios from './axios';
import { USERS_URL } from './requests';

export const signUp = (params) => {
  return axios.post(USERS_URL, params);
};
