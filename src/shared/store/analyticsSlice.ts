import { analyticsData } from '@/lib/data/mock';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AnalyticsPeriod = 'year' | 'quarter' | 'month';

export interface RevenueDataPoint {
	name: string;
	revenue: number;
	profit: number;
}

export interface LeadSource {
	name: string;
	value: number;
	color: string;
}

export interface ConversionFunnelPoint {
	name: string;
	value: number;
	color: string;
}

export interface ClientPerformance {
	name: string;
	company: string;
	revenue: number;
	deals: number;
	status: 'active' | 'new' | 'inactive';
}

export interface MonthlyMetrics {
	totalRevenue: number;
	totalClients: number;
	activeDeals: number;
	conversionRate: number;
	averageDealSize: number;
	newClients: number;
	closedDeals: number;
}

export interface AnalyticsState {
	period: AnalyticsPeriod;
	revenueData: RevenueDataPoint[];
	leadSources: LeadSource[];
	conversionFunnel: ConversionFunnelPoint[];
	clientPerformance: ClientPerformance[];
	monthlyMetrics: MonthlyMetrics;
	loading: boolean;
	error: string | null;
}

const initialState: AnalyticsState = {
	period: 'year',
	revenueData: analyticsData.revenueData,
	leadSources: analyticsData.leadSources,
	conversionFunnel: analyticsData.conversionFunnel,
	clientPerformance: analyticsData.clientPerformance as ClientPerformance[],
	monthlyMetrics: analyticsData.monthlyMetrics,
	loading: false,
	error: null,
};

const analyticsSlice = createSlice({
	name: 'analytics',
	initialState,
	reducers: {
		setPeriod(state, action: PayloadAction<AnalyticsPeriod>) {
			state.period = action.payload;
		},
		setRevenueData(state, action: PayloadAction<RevenueDataPoint[]>) {
			state.revenueData = action.payload;
		},
		setLeadSources(state, action: PayloadAction<LeadSource[]>) {
			state.leadSources = action.payload;
		},
		setConversionFunnel(state, action: PayloadAction<ConversionFunnelPoint[]>) {
			state.conversionFunnel = action.payload;
		},
		setClientPerformance(state, action: PayloadAction<ClientPerformance[]>) {
			state.clientPerformance = action.payload;
		},
		setMonthlyMetrics(state, action: PayloadAction<MonthlyMetrics>) {
			state.monthlyMetrics = action.payload;
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload;
		},
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload;
		},
		setAllAnalytics(state, action: PayloadAction<Omit<AnalyticsState, 'period' | 'loading' | 'error'>>) {
			state.revenueData = action.payload.revenueData;
			state.leadSources = action.payload.leadSources;
			state.conversionFunnel = action.payload.conversionFunnel;
			state.clientPerformance = action.payload.clientPerformance;
			state.monthlyMetrics = action.payload.monthlyMetrics;
		},
	},
});

export const {
	setPeriod,
	setRevenueData,
	setLeadSources,
	setConversionFunnel,
	setClientPerformance,
	setMonthlyMetrics,
	setLoading,
	setError,
	setAllAnalytics,
} = analyticsSlice.actions;
export default analyticsSlice.reducer;
