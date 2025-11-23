import { Employee } from '@/lib/interface/employee';
import { employeeService } from '@/lib/services/employeeService';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EmployeeState {
	employees: Employee[];
	currentEmployee: Employee | null;
	isLoading: boolean;
	error: string | null;
}

const initialState: EmployeeState = {
	employees: [],
	currentEmployee: null,
	isLoading: false,
	error: null,
};

// Async thunk for fetching all employees
export const fetchEmployees = createAsyncThunk('employee/fetchEmployees', async (_, { rejectWithValue }) => {
	try {
		const employees = await employeeService.getAllEmployees();
		return employees;
	} catch (error: any) {
		const errorMessage = error?.message || error?.toString() || 'Failed to fetch employees';
		return rejectWithValue(errorMessage);
	}
});

// Async thunk for creating employee
export const createEmployee = createAsyncThunk(
	'employee/createEmployee',
	async (data: import('@/lib/services/employeeService').CreateEmployeeData, { rejectWithValue }) => {
		try {
			const employee = await employeeService.createEmployee(data);
			return employee;
		} catch (error: any) {
			const errorMessage = error?.message || error?.toString() || 'Failed to create employee';
			return rejectWithValue(errorMessage);
		}
	},
);

// Async thunk for updating employee
export const updateEmployee = createAsyncThunk(
	'employee/updateEmployee',
	async (data: import('@/lib/services/employeeService').UpdateEmployeeData, { rejectWithValue }) => {
		try {
			const employee = await employeeService.updateEmployee(data);
			return employee;
		} catch (error: any) {
			const errorMessage = error?.message || error?.toString() || 'Failed to update employee';
			return rejectWithValue(errorMessage);
		}
	},
);

const employeeSlice = createSlice({
	name: 'employee',
	initialState,
	reducers: {
		setEmployees: (state, action: PayloadAction<Employee[]>) => {
			state.employees = action.payload;
		},
		setCurrentEmployee: (state, action: PayloadAction<Employee | null>) => {
			state.currentEmployee = action.payload;
		},
		clearCurrentEmployee: (state) => {
			state.currentEmployee = null;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// Fetch all employees
			.addCase(fetchEmployees.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchEmployees.fulfilled, (state, action) => {
				state.isLoading = false;
				state.employees = action.payload;
				state.error = null;
			})
			.addCase(fetchEmployees.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			// Create employee
			.addCase(createEmployee.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(createEmployee.fulfilled, (state, action) => {
				state.isLoading = false;
				state.employees.push(action.payload);
				state.error = null;
			})
			.addCase(createEmployee.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			// Update employee
			.addCase(updateEmployee.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(updateEmployee.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.employees.findIndex((emp) => emp.id === action.payload.id);
				if (index !== -1) {
					state.employees[index] = action.payload;
				}
				state.error = null;
			})
			.addCase(updateEmployee.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export const { setEmployees, setCurrentEmployee, clearCurrentEmployee, clearError } = employeeSlice.actions;
export default employeeSlice.reducer;
