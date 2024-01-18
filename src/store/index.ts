import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/slice";
import { FLUSH, PAUSE, PERSIST, PURGE, PersistConfig, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import { AuthStateType } from "./auth/type";
const persistConfig:PersistConfig<AuthStateType, any, any, any> = {
	key: "root",
	version: 1,
	storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
});
const persistor = persistStore(store);

export { store, persistor };
