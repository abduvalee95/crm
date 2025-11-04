import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AnalyticsPeriod = 'year' | 'quarter' | 'month';

export interface AnalyticsState {
	period: AnalyticsPeriod;
}

const initialState: AnalyticsState = {
	period: 'year',
};

const analyticsSlice = createSlice({
	name: 'analytics',
	initialState,
	reducers: {
		setPeriod(state, action: PayloadAction<AnalyticsPeriod>) {
			state.period = action.payload;
		},
	},
});

export const { setPeriod } = analyticsSlice.actions;
export default analyticsSlice.reducer;
