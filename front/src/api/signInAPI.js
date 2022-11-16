import axios from './axios';
import { SIGN_IN_URL } from './requests';

export const signIn = (params) => {
  return axios.post(SIGN_IN_URL, params);
};
