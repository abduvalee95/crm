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

// Async thunk for creating client
export const createClient = createAsyncThunk(
	'client/createClient',
	async (data: import('@/lib/interface/client').CreateClientData, { rejectWithValue }) => {
		try {
			const client = await clientService.createClient(data);
			return client;
		} catch (error: any) {
			const errorMessage = error?.message || error?.toString() || 'Failed to create client';
			return rejectWithValue(errorMessage);
		}
	},
);

// Async thunk for updating client
export const updateClient = createAsyncThunk(
	'client/updateClient',
	async (
		{ id, data }: { id: string; data: import('@/lib/interface/client').UpdateClientData },
		{ rejectWithValue },
	) => {
		try {
			const client = await clientService.updateClient(id, data);
			return client;
		} catch (error: any) {
			const errorMessage = error?.message || error?.toString() || 'Failed to update client';
			return rejectWithValue(errorMessage);
		}
	},
);

// Async thunk for deleting client
export const deleteClient = createAsyncThunk('client/deleteClient', async (id: string, { rejectWithValue }) => {
	try {
		const result = await clientService.deleteClient(id);
		return result.deletedClient;
	} catch (error: any) {
		const errorMessage = error?.message || error?.toString() || 'Failed to delete client';
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
		removeClient: (state, action: PayloadAction<string>) => {
			state.clients = state.clients.filter((client) => client.id !== action.payload);
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
			})
			// Create client
			.addCase(createClient.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(createClient.fulfilled, (state, action) => {
				state.isLoading = false;
				state.clients.push(action.payload);
				state.error = null;
			})
			.addCase(createClient.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			// Update client
			.addCase(updateClient.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(updateClient.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.clients.findIndex((client) => client.id === action.payload.id);
				if (index !== -1) {
					state.clients[index] = action.payload;
				}
				if (state.currentClient?.id === action.payload.id) {
					state.currentClient = action.payload;
				}
				state.error = null;
			})
			.addCase(updateClient.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			// Delete client
			.addCase(deleteClient.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(deleteClient.fulfilled, (state, action) => {
				state.isLoading = false;
				state.clients = state.clients.filter((client) => client.id !== action.payload.id);
				if (state.currentClient?.id === action.payload.id) {
					state.currentClient = null;
				}
				state.error = null;
			})
			.addCase(deleteClient.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export const { setClients, setCurrentClient, clearCurrentClient, clearError, removeClient } = clientSlice.actions;
export default clientSlice.reducer;
