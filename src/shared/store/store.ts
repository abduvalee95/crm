import { configureStore } from '@reduxjs/toolkit';
import analyticsReducer from './analyticsSlice';
import chatReducer from './chatSlice';
import clientReducer from './clientSlice';
import dealReducer from './dealSlice';
import employeeReducer from './employeeSlice';
import uiReducer from './uiSlice';
import userReducer from './userSlice';

export const store = configureStore({
	reducer: {
		ui: uiReducer,
		analytics: analyticsReducer,
		user: userReducer,
		employee: employeeReducer,
		client: clientReducer,
		deal: dealReducer,
		chat: chatReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
