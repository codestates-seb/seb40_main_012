import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './modules/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
