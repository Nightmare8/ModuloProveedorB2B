import { combineReducers, configureStore } from "@reduxjs/toolkit"
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {composeWithDevTools} from "redux-devtools-extension"

import authSlice from "./slices/authSlice.js";
import cartSlice from "./slices/cartSlice.js";
console.log("cartSlice", cartSlice)
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
const rootReducer =  combineReducers({
    auth: authSlice,
    cart: cartSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: composeWithDevTools(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
    }),
});

export const persistor = persistStore(store);