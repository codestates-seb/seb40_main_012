import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import counterReducer from './modules/counterSlice';
import signUpReducer from './modules/signUpSlice';
import signInReducer from './modules/signInSlice';
import duplicationCheckReducer from './modules/duplicationCheckSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['signIn'],
};

export const rootReducer = combineReducers({
  counter: counterReducer,
  signUp: signUpReducer,
  signIn: signInReducer,
  duplicationCheck: duplicationCheckReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          'signIn/getTokens/fulfilled',
        ],
      },
    }),
});
