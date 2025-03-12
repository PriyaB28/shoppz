import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);
export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
})

export const persistor = persistStore(store);