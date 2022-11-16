import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './modules/counterSlice';
import signUpReducer from './modules/signUpSlice';
import pairingReducer from './modules/pairingSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    signUp: signUpReducer,
    pairing: pairingReducer,
  },
});
