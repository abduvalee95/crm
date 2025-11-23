import { Role } from '../enums/status';
import { SignupResponse } from '../interface/user';

const baseUrl1 = 'http://localhost:3000';

export interface ApiError {
	message: string;
	status?: number;
	errors?: Record<string, string[]>;
}

class ApiClient {
	private baseUrl: string;

	constructor(baseUrl: string = baseUrl1) {
		this.baseUrl = baseUrl;
	}

	private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`;
		const rawToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

		// Token'ni trim qilish va tekshirish
		const token = rawToken?.trim() || null;

		const headers: HeadersInit = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			...options.headers,
		};

		if (token) {
			(headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
		}

		try {
			console.log('API Request:', {
				method: options.method || 'GET',
				url,
				hasToken: !!token,
				headers: {
					'Content-Type': (headers as Record<string, string>)['Content-Type'],
					Authorization: token ? 'Bearer ***' : undefined, // Token'ni ko'rsatmaydi, xavfsizlik uchun
				},
			});

			const response = await fetch(url, {
				...options,
				headers,
			});

			let data: any;
			const contentType = response.headers.get('content-type');

			if (contentType && contentType.includes('application/json')) {
				data = await response.json().catch(() => ({}));
			} else {
				const text = await response.text();
				data = text || 'no data';
			}

			console.log('API Response:>>>', {
				status: response.status,
				statusText: response.statusText,
				data,
			});

			if (!response.ok) {
				const error: ApiError = {
					message: data.message || data.error || `HTTP error! status: ${response.status}`,
					status: response.status,
					errors: data.errors || (data.message ? { _general: [data.message] } : undefined),
				};
				throw error;
			}

			return data;
		} catch (error) {
			if (error && typeof error === 'object' && 'status' in error) {
				throw error;
			}

			// Обработка сетевых ошибок
			const networkError: ApiError = {
				message: error instanceof Error ? error.message : 'Ошибка сети. Проверьте подключение к серверу.',
				status: 0,
			};
			throw networkError;
		}
	}

	async get<T>(endpoint: string): Promise<T> {
		return this.request<T>(endpoint, { method: 'GET' });
	}

	async post<T>(endpoint: string, data?: unknown): Promise<T> {
		return this.request<T>(endpoint, {
			method: 'POST',
			body: data ? JSON.stringify(data) : undefined,
		});
	}

	async put<T>(endpoint: string, data?: unknown): Promise<T> {
		return this.request<T>(endpoint, {
			method: 'PUT',
			body: data ? JSON.stringify(data) : undefined,
		});
	}

	async delete<T>(endpoint: string): Promise<T> {
		return this.request<T>(endpoint, { method: 'DELETE' });
	}

	async uploadFile<T>(endpoint: string, formData: FormData): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`;
		const rawToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
		const token = rawToken?.trim() || null;

		const headers: HeadersInit = {
			// FormData uchun Content-Type ni o'rnatmaymiz, browser o'zi boundary bilan qo'yadi
			Accept: 'application/json',
		};

		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}

		try {
			console.log('API Upload Request:', {
				method: 'POST',
				url,
				hasToken: !!token,
			});

			const response = await fetch(url, {
				method: 'POST',
				headers,
				body: formData,
			});

			let data: any;
			const contentType = response.headers.get('content-type');

			if (contentType && contentType.includes('application/json')) {
				data = await response.json().catch(() => ({}));
			} else {
				const text = await response.text();
				data = text || '';
			}

			console.log('API Upload Response:', {
				status: response.status,
				statusText: response.statusText,
				data,
			});

			if (!response.ok) {
				const error: ApiError = {
					message: data.message || data.error || `HTTP error! status: ${response.status}`,
					status: response.status,
					errors: data.errors || (data.message ? { _general: [data.message] } : undefined),
				};
				throw error;
			}

			return data;
		} catch (error) {
			if (error && typeof error === 'object' && 'status' in error) {
				throw error;
			}

			const networkError: ApiError = {
				message: error instanceof Error ? error.message : 'Ошибка сети. Проверьте подключение к серверу.',
				status: 0,
			};
			throw networkError;
		}
	}
}

export const apiClient = new ApiClient();

// Registration API
export interface RegistrationData {
	fullName: string;
	email: string;
	password: string;
	role?: Role;
	position?: string;
	phone?: string;
}

export type RegistrationResponse = SignupResponse;

export const registrationApi = {
	register: async (data: RegistrationData): Promise<RegistrationResponse> => {
		return apiClient.post<RegistrationResponse>('/user/signup', data);
	},
};
