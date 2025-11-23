import { RegistrationData, RegistrationResponse } from '@/lib/api/client';
import { LoginResponse, UpdateUserData } from '@/lib/interface/user';
import { userService } from '@/lib/services/userService';
import type { AppDispatch } from '@/shared/store/store';
import { clearUser, updateUser } from '@/shared/store/userSlice';

// Token management functions - localStorage ishlatiladi (reload'da saqlanib qoladi)
export function getToken(): string | null {
	if (typeof window !== 'undefined') {
		return localStorage.getItem('token');
	}
	return null;
}

export function setToken(token: string): void {
	if (typeof window !== 'undefined') {
		localStorage.setItem('token', token);
	}
}

export function removeToken(): void {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('token');
	}
}

// Login function
export const login = async (email: string, password: string): Promise<LoginResponse> => {
	try {
		const response = await userService.login({ email, password });

		if (response.token) {
			setToken(response.token);
		}

		return response;
	} catch (err) {
		console.error('Login error:', err);
		removeToken();
		throw err;
	}
};

// Registration function
export const signUp = async (data: RegistrationData): Promise<RegistrationResponse> => {
	try {
		const response = await userService.register(data);

		if (response.token) {
			setToken(response.token);
		}

		return response;
	} catch (err) {
		console.error('Registration error:', err);
		removeToken();
		throw err;
	}
};

/**
 * Logout function
 *
 * Bu funksiya:
 * 1. Token'ni localStorage'dan olib tashlaydi
 * 2. Redux store'dan user ma'lumotlarini tozalaydi
 * 3. Login page'ga yo'naltiradi
 *
 * @param dispatch - Redux dispatch funksiyasi (optional, agar Redux store'dan foydalanmoqchi bo'lsangiz)
 * @param redirectToLogin - Login page'ga yo'naltirish (default: true)
 */
export const logOut = (dispatch?: AppDispatch, redirectToLogin: boolean = true): void => {
	// Token'ni tozalash
	removeToken();

	// Redux store'dan user ma'lumotlarini tozalash
	if (dispatch) {
		dispatch(clearUser());
	}

	// Login page'ga yo'naltirish
	if (redirectToLogin && typeof window !== 'undefined') {
		// Next.js router ishlatish yaxshiroq
		window.location.href = '/login';
	}
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
	return getToken() !== null;
};

/**
 * Update user profile function
 *
 * Bu funksiya user ma'lumotlarini yangilaydi.
 *
 * @param data - Yangilanishi kerak bo'lgan user ma'lumotlari
 * @param dispatch - Redux dispatch funksiyasi
 */
export const updateProfile = async (data: UpdateUserData, dispatch: AppDispatch): Promise<void> => {
	try {
		await dispatch(updateUser(data));
	} catch (error) {
		console.error('Failed to update profile:', error);
		throw error;
	}
};
