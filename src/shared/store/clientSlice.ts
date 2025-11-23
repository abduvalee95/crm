import { clientService } from '@/lib/services/clientService';
import { Client } from '@/lib/types/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ClientState {
	clients: Client[];
	currentClient: Client | null;
	isLoading: boolean;
	error: string | null;
}

const initialState: ClientState = {
	clients: [],
	currentClient: null,
	isLoading: false,
	error: null,
};

// Async thunk for fetching all clients
export const fetchClients = createAsyncThunk('client/fetchClients', async (_, { rejectWithValue }) => {
	try {
		const clients = await clientService.getAllClients();
		return clients;
	} catch (error: any) {
		const errorMessage = error?.message || error?.toString() || 'Failed to fetch clients';
		return rejectWithValue(errorMessage);
	}
});

export const fetchClientById = createAsyncThunk('client/fetchClientById', async (id: string, { rejectWithValue }) => {
	try {
		const client = await clientService.getClientById(id);
		return client;
	} catch (error: any) {
		const errorMessage = error?.message || error?.toString() || 'Failed to fetch client';
		return rejectWithValue(errorMessage);
	}
});

const clientSlice = createSlice({
	name: 'client',
	initialState,
	reducers: {
		setClients: (state, action: PayloadAction<Client[]>) => {
			state.clients = action.payload;
		},
		setCurrentClient: (state, action: PayloadAction<Client | null>) => {
			state.currentClient = action.payload;
		},
		clearCurrentClient: (state) => {
			state.currentClient = null;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// Fetch all clients
			.addCase(fetchClients.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchClients.fulfilled, (state, action) => {
				state.isLoading = false;
				state.clients = action.payload;
				state.error = null;
			})
			.addCase(fetchClients.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			}) // Fetch client by ID
			.addCase(fetchClientById.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchClientById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.currentClient = action.payload;
				state.error = null;
			})
			.addCase(fetchClientById.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export const { setClients, setCurrentClient, clearCurrentClient, clearError } = clientSlice.actions;
export default clientSlice.reducer;
