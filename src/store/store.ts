import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
