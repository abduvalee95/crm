'use client';

import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { fetchCurrentUser } from '@/shared/store/userSlice';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef } from 'react';

/**
 * AuthInitializer component
 *
 * Bu component har doim ishlaydi va reload qilganda token'ni tekshiradi.
 * Agar token mavjud bo'lsa va user ma'lumotlari yo'q bo'lsa, user'ni yuklaydi.
 * Token invalid yoki expired bo'lsa, token'ni tozalaydi va login page'ga yo'naltiradi.
 *
 * Features:
 * - Automatic token validation on page reload
 * - Smart redirect logic (only redirects if not on auth pages)
 * - Prevents duplicate initialization
 * - Proper error handling
 * - SSR safe
 *
 * @returns {null} - Bu component hech narsa render qilmaydi
 */
export function AuthInitializer() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const pathname = usePathname();
	const user = useAppSelector((state) => state.user.user);
	const isLoading = useAppSelector((state) => state.user.isLoading);
	const hasInitialized = useRef(false);
	const isInitializing = useRef(false);

	// Auth sahifalar ro'yxati - bu sahifalarda redirect qilmaydi
	const authPages = useMemo(() => ['/login', '/register'], []);

	// Token'ni tozalash va redirect qilish funksiyasi
	const handleAuthError = useCallback(() => {
		if (typeof window === 'undefined') return;

		localStorage.removeItem('token');

		// Auth sahifada bo'lmasa, login page'ga yo'naltirish
		if (!authPages.includes(pathname)) {
			router.push('/login');
		}
	}, [authPages, pathname, router]);

	// Auth initialization
	useEffect(() => {
		// Faqat bir marta ishlashini ta'minlash
		if (hasInitialized.current || isInitializing.current) return;

		const initializeAuth = async () => {
			// SSR uchun tekshirish
			if (typeof window === 'undefined') return;

			const token = localStorage.getItem('token');

			// Token yo'q bo'lsa, hech narsa qilmaydi
			if (!token) {
				hasInitialized.current = true;
				return;
			}

			// User allaqachon yuklangan bo'lsa, hech narsa qilmaydi
			if (user) {
				hasInitialized.current = true;
				return;
			}

			// Loading holatida bo'lsa, kutadi
			if (isLoading) return;

			try {
				isInitializing.current = true;

				// User ma'lumotlarini yuklash
				const result = await dispatch(fetchCurrentUser());

				// Debug uchun
				console.log('fetchCurrentUser result:', result);

				// Agar xato bo'lsa, token invalid yoki expired
				if (fetchCurrentUser.rejected.match(result)) {
					console.warn('Token invalid or expired:', result.payload);
					handleAuthError();
				} else {
					// Muvaffaqiyatli yuklandi
					console.log('User loaded successfully:', result.payload);
					hasInitialized.current = true;
				}
			} catch (error) {
				console.error('Failed to initialize auth:', error);
				handleAuthError();
			} finally {
				isInitializing.current = false;
			}
		};

		initializeAuth();
	}, [dispatch, user, isLoading, handleAuthError]);

	// User o'zgarganda, hasInitialized'ni reset qilish (logout holatida)
	useEffect(() => {
		if (!user) {
			hasInitialized.current = false;
			isInitializing.current = false;
		}
	}, [user]);

	return null;
}
