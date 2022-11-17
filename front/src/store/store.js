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
import authReducer from './modules/authSlice';
import duplicationCheckReducer from './modules/duplicationCheckSlice';
import allPairingReducer from './modules/allPairingSlice';
import pairingReducer from './modules/pairingSlice';
import filmPairingReducer from './modules/filmPairingSlice';
import cuisinePairingReducer from './modules/cuisinePairingSlice';
import musicPairingReducer from './modules/musicPairingSlice';
import bookPairingReducer from './modules/bookPairingSlice';
import etcPairingReducer from './modules/etcPairingSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

export const rootReducer = combineReducers({
  counter: counterReducer,
  signUp: signUpReducer,
  signIn: signInReducer,
  auth: authReducer,
  duplicationCheck: duplicationCheckReducer,
  allPairing: allPairingReducer,
  filmPairing: filmPairingReducer,
  cuisinePairing: cuisinePairingReducer,
  musicPairing: musicPairingReducer,
  bookPairing: bookPairingReducer,
  etcPairing: etcPairingReducer,
  pairing: pairingReducer,
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
          'auth/getTokens/fulfilled',
        ],
      },
    }),
});
