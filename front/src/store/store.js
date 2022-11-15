import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './modules/counterSlice';
import signUpReducer from './modules/signUpSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    signUp: signUpReducer,
  },
});
