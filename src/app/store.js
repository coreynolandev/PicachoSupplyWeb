import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import cartSlice from '../features/cartSlice';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
	key: 'root',
	storage
};

const persistedReducer = persistReducer(persistConfig, cartSlice);

export const store = configureStore({
	reducer: {
		cart: persistedReducer
	},
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [thunk]
});

export const persistor = persistStore(store);
