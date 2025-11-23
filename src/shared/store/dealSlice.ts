import { CreateDealData, Deal, UpdateDealData } from '@/lib/interface/deal';
import { dealService } from '@/lib/services/dealService';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DealState {
	deals: Deal[];
	currentDeal: Deal | null;
	isLoading: boolean;
	error: string | null;
}

const initialState: DealState = {
	deals: [],
	currentDeal: null,
	isLoading: false,
	error: null,
};

// Async thunk for fetching all deals
export const fetchDeals = createAsyncThunk('deal/fetchDeals', async (_, { rejectWithValue }) => {
	try {
		const deals = await dealService.getAllDeals();
		if (deals.length === 0) {
			return rejectWithValue('No deals found');
		}
		return deals;
	} catch (error: any) {
		const errorMessage = error?.message || error?.toString() || 'Failed to fetch deals';
		return rejectWithValue(errorMessage);
	}
});

// Async thunk for fetching deal by ID
export const fetchDealById = createAsyncThunk('deal/fetchDealById', async (id: string, { rejectWithValue }) => {
	try {
		const deal = await dealService.getDealById(id);
		return deal;
	} catch (error: any) {
		const errorMessage = error?.message || error?.toString() || 'Failed to fetch deal';
		return rejectWithValue(errorMessage);
	}
});

// Async thunk for creating deal
export const createDeal = createAsyncThunk('deal/createDeal', async (data: CreateDealData, { rejectWithValue }) => {
	try {
		const deal = await dealService.createDeal(data);
		return deal;
	} catch (error: any) {
		const errorMessage = error?.message || error?.toString() || 'Failed to create deal';
		return rejectWithValue(errorMessage);
	}
});

// Async thunk for updating deal
export const updateDeal = createAsyncThunk(
	'deal/updateDeal',
	async ({ id, data }: { id: string; data: UpdateDealData }, { rejectWithValue }) => {
		try {
			const deal = await dealService.updateDeal(id, data);
			return deal;
		} catch (error: any) {
			const errorMessage = error?.message || error?.toString() || 'Failed to update deal';
			return rejectWithValue(errorMessage);
		}
	},
);

// Async thunk for deleting deal
export const deleteDeal = createAsyncThunk('deal/deleteDeal', async (id: string, { rejectWithValue }) => {
	try {
		const result = await dealService.deleteDeal(id);
		return result.deletedDeal;
	} catch (error: any) {
		const errorMessage = error?.message || error?.toString() || 'Failed to delete deal';
		return rejectWithValue(errorMessage);
	}
});

const dealSlice = createSlice({
	name: 'deal',
	initialState,
	reducers: {
		setDeals: (state, action: PayloadAction<Deal[]>) => {
			state.deals = action.payload;
		},
		setCurrentDeal: (state, action: PayloadAction<Deal | null>) => {
			state.currentDeal = action.payload;
		},
		clearCurrentDeal: (state) => {
			state.currentDeal = null;
		},
		clearError: (state) => {
			state.error = null;
		},
		// Remove deal from list after delete (if delete endpoint is added later)
		removeDeal: (state, action: PayloadAction<string>) => {
			state.deals = state.deals.filter((deal) => deal.id !== action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			// Fetch all deals
			.addCase(fetchDeals.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchDeals.fulfilled, (state, action) => {
				state.isLoading = false;
				state.deals = action.payload;
				state.error = null;
			})
			.addCase(fetchDeals.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			// Fetch deal by ID
			.addCase(fetchDealById.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchDealById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.currentDeal = action.payload;
				state.error = null;
			})
			.addCase(fetchDealById.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			// Create deal
			.addCase(createDeal.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(createDeal.fulfilled, (state, action) => {
				state.isLoading = false;
				state.deals.push(action.payload);
				state.error = null;
			})
			.addCase(createDeal.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			// Update deal
			.addCase(updateDeal.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(updateDeal.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.deals.findIndex((deal) => deal.id === action.payload.id);
				if (index !== -1) {
					state.deals[index] = action.payload;
				}
				if (state.currentDeal?.id === action.payload.id) {
					state.currentDeal = action.payload;
				}
				state.error = null;
			})
			.addCase(updateDeal.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			// Delete deal
			.addCase(deleteDeal.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(deleteDeal.fulfilled, (state, action) => {
				state.isLoading = false;
				state.deals = state.deals.filter((deal) => deal.id !== action.payload.id);
				if (state.currentDeal?.id === action.payload.id) {
					state.currentDeal = null;
				}
				state.error = null;
			})
			.addCase(deleteDeal.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export const { setDeals, setCurrentDeal, clearCurrentDeal, clearError, removeDeal } = dealSlice.actions;
export default dealSlice.reducer;
