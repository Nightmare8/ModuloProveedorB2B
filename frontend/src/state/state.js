import { configureStore } from "@reduxjs/toolkit"

import { authSlice } from "./authSlice.js";
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
  } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: storageSession,
    version: 1,
}

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
    }),
});

export const persistor = persistStore(store);