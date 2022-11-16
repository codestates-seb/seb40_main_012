import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './modules/counterSlice';
import signUpReducer from './modules/signUpSlice';
import signInReducer from './modules/signInSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    signUp: signUpReducer,
    signIn: signInReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
