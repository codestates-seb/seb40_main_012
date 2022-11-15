import axios from './axios';
import { SIGN_UP_URL } from './requests';

export const signUp = (params) => {
  return axios.post(SIGN_UP_URL, params);
};
