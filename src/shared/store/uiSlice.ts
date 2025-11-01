import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UIState {
	sidebarOpen: boolean;
}

const initialState: UIState = {
	sidebarOpen: true,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleSidebar(state) {
			state.sidebarOpen = !state.sidebarOpen;
		},
		setSidebar(state, action: PayloadAction<boolean>) {
			state.sidebarOpen = action.payload;
		},
	},
});

export const { toggleSidebar, setSidebar } = uiSlice.actions;
export default uiSlice.reducer;

