import { CurrentUser, LoginData, UpdateUserData } from '@/lib/interface/user';
import { userService } from '@/lib/services/userService';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
	user: CurrentUser | null;
	isLoading: boolean;
	error: string | null;
}

const initialState: UserState = {
	user: null,
	isLoading: false,
	error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk('user/login', async (data: LoginData, { rejectWithValue }) => {
	try {
		const response = await userService.login(data);
		// Save token
		if (response.token) {
			localStorage.setItem('token', response.token);
		}
		// Convert LoginResponse to CurrentUser
		const user: CurrentUser = {
			id: response.id,
			fullName: response.fullName || '',
			email: response.email || '',
			role: response.role,
			position: response.position,
			phone: response.phone,
			avatar: response.avatar,
		};
		return user;
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to login');
	}
});

// Async thunk for fetching current user
export const fetchCurrentUser = createAsyncThunk('user/fetchCurrentUser', async (_, { rejectWithValue }) => {
	try {
		console.log('Fetching current user...');
		const user = await userService.getCurrentUser();
		console.log('Current user received:', user);
		return user;
	} catch (error: any) {
		console.error('Failed to fetch user:', error);
		return rejectWithValue(error.message || 'Failed to fetch user');
	}
});

// Async thunk for updating user profile
export const updateUser = createAsyncThunk('user/updateUser', async (data: UpdateUserData, { rejectWithValue }) => {
	try {
		const response = await userService.updateUser(data);
		// Backend'dan user object qaytarsa
		return response.user || response; // response.user mavjud bo'lsa, aks holda response
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to update user');
	}
});

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<CurrentUser | null>) => {
			state.user = action.payload;
		},
		clearUser: (state) => {
			state.user = null;
			state.error = null;
		},
		updateUserLocal: (state, action: PayloadAction<Partial<CurrentUser>>) => {
			if (state.user) {
				state.user = { ...state.user, ...action.payload };
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
				state.error = null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			.addCase(fetchCurrentUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchCurrentUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
				state.error = null;
			})
			.addCase(fetchCurrentUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
				// Clear invalid token
				if (typeof window !== 'undefined') {
					localStorage.removeItem('token');
				}
			})
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
				state.error = null;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export const { setUser, clearUser, updateUserLocal } = userSlice.actions;
export default userSlice.reducer;
