import {
	configureStore,
	combineReducers,
	getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userLoggedReducer from "./slice/userLoggedSlice";

const persistConfig = {
	key: "root",
	storage,
};

const rootReducer = combineReducers({
	userLogged: userLoggedReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
			},
		}),
});

export const persistor = persistStore(store);

export default store;
