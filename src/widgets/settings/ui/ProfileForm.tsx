'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { baseUrl } from '@/lib/config/config';
import { Role } from '@/lib/enums/status';
import { UpdateUserData } from '@/lib/interface/user';
import { userService } from '@/lib/services/userService';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { fetchCurrentUser, updateUser } from '@/shared/store/userSlice';
import { Card } from '@/shared/ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Briefcase, ChevronDown, Globe, Mail, Phone, Save, Upload, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ProfileForm() {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector((state) => state.user.user);
	const isLoadingRedux = useAppSelector((state) => state.user.isLoading);

	const [formData, setFormData] = useState({
		firstName: currentUser?.fullName?.split(' ')[0] || '',
		lastName: currentUser?.fullName?.split(' ').slice(1).join(' ') || '',
		email: currentUser?.email || '',
		phone: currentUser?.phone || '',
		position: currentUser?.position || '',
		language: currentUser?.role?.toString() || '',
		avatar: currentUser?.avatar || '',
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	});

	const [isLoading, setIsLoading] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [avatar, setAvatar] = useState<string>(currentUser?.avatar || '');
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	// User ma'lumotlarini formga  jonatish
	useEffect(() => {
		if (currentUser) {
			const nameParts = currentUser.fullName?.split(' ') || [];
			setFormData((prev) => ({
				...prev,
				firstName: nameParts[0] || prev.firstName,
				lastName: nameParts.slice(1).join(' ') || prev.lastName,
				email: currentUser.email || prev.email,
				phone: currentUser.phone || prev.phone,
				position: currentUser.position || prev.position,
			}));
			if (currentUser.avatar) {
				// Format avatar URL
				let avatarUrl = currentUser.avatar;
				if (!avatarUrl.startsWith('http')) {
					// Remove leading "./" if present
					avatarUrl = avatarUrl.replace(/^\.\//, '');
					// Construct full URL
					avatarUrl = `${baseUrl}/${avatarUrl}`;
				}
				setAvatar(avatarUrl);
			}
		}
	}, [currentUser]);

	useEffect(() => {
		if (currentUser?.avatar) {
			let avatarUrl = currentUser.avatar;
			if (!avatarUrl.startsWith('http')) {
				avatarUrl = avatarUrl.replace(/^\.\//, '');
				avatarUrl = `${baseUrl}/${avatarUrl}`;
			}
			setAvatar(avatarUrl);
		} else {
			setAvatar('');
		}
	}, [currentUser?.avatar]);

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Parol validatsiyasi
		if (formData.newPassword || formData.confirmPassword || formData.currentPassword) {
			if (!formData.currentPassword) {
				alert('Введите текущий пароль');
				setIsLoading(false);
				return;
			}
			if (!formData.newPassword) {
				alert('Введите новый пароль');
				setIsLoading(false);
				return;
			}
			if (formData.newPassword.length < 6) {
				alert('Новый пароль должен содержать минимум 6 символов');
				setIsLoading(false);
				return;
			}
			if (formData.newPassword !== formData.confirmPassword) {
				alert('Пароли не совпадают');
				setIsLoading(false);
				return;
			}
		}

		try {
			// Ism va familiyani to'g'ri formatlash
			const firstName = formData.firstName?.trim();
			const lastName = formData.lastName?.trim();
			const fullName = [firstName, lastName].filter(Boolean).join(' ');

			// Update data object
			const updateData: UpdateUserData = {
				fullName: fullName || '',
				email: formData.email?.trim() || '',
				phone: formData.phone?.trim() || '',
				position: formData.position?.trim() || '',
				avatar: avatar || '',
			};

			// Parol o'zgartirish uchun
			if (formData.currentPassword && formData.newPassword) {
				updateData.currentPassword = formData.currentPassword;
				updateData.newPassword = formData.newPassword;
			}

			const result = await dispatch(updateUser(updateData));

			if (updateUser.fulfilled.match(result)) {
				// Parol maydonlarini tozalash
				await dispatch(fetchCurrentUser());
				setFormData((prev) => ({
					...prev,
					currentPassword: '',
					newPassword: '',
					confirmPassword: '',
				}));

				alert('Профиль успешно обновлен');
			} else {
				alert(`Ошибка: ${result.payload || 'Не удалось обновить профиль'}`);
			}
		} catch (error: any) {
			console.error('Error updating profile:', error);
			alert(`Ошибка: ${error.message || 'Не удалось обновить профиль'}`);
		} finally {
			setIsLoading(false);
		}
	};

	const handleAvatarButton = () => fileInputRef.current?.click();

	const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// File validation
		const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
		if (!allowedTypes.includes(file.type)) {
			alert('Invalid file type. Only JPEG, PNG, JPG, GIF, and WEBP are allowed.');
			return;
		}
		// File size validation (5MB)
		const maxSize = 5 * 1024 * 1024; // 5MB
		if (file.size > maxSize) {
			alert('File size must be less than 5MB.');
			return;
		}

		setIsUploading(true);

		try {
			// Upload to backend
			const avatarPath = await userService.uploadAvatar(file);

			let avatarUrl = avatarPath;

			// URL ni formatlash
			if (!avatarUrl.startsWith('http://') && !avatarUrl.startsWith('https://')) {
				// Remove leading "./" if present
				avatarUrl = avatarUrl.replace(/^\.\//, '');

				// To'liq URL yaratish
				if (avatarUrl.startsWith('uploads/')) {
					avatarUrl = `${baseUrl}/${avatarUrl}`;
				} else if (avatarUrl.startsWith('/uploads/')) {
					avatarUrl = `${baseUrl}${avatarUrl}`;
				} else if (!avatarUrl.startsWith('/')) {
					avatarUrl = `${baseUrl}/uploads/${avatarUrl}`;
				} else {
					avatarUrl = `${baseUrl}${avatarUrl}`;
				}
			}

			setAvatar(avatarUrl);

			// Update user in Redux store to get latest user data
			await dispatch(fetchCurrentUser());

			alert('Avatar успешно загружен');
		} catch (error: any) {
			console.error('Error uploading avatar:', error);
			alert(`Ошибка загрузки: ${error.message || 'Не удалось загрузить изображение'}`);
		} finally {
			setIsUploading(false);
			// Reset file input
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		}
	};

	const formatAvatarUrl = (avatarPath: string | undefined | null): string => {
		if (!avatarPath) return '';

		let avatarUrl = avatarPath;

		// Agar allaqachon to'liq URL bo'lsa
		if (avatarUrl.startsWith('http://') || avatarUrl.startsWith('https://')) {
			return avatarUrl;
		}

		// Remove leading "./" if present
		avatarUrl = avatarUrl.replace(/^\.\//, '');

		// To'liq URL yaratish
		if (avatarUrl.startsWith('uploads/')) {
			return `${baseUrl}/${avatarUrl}`;
		} else if (avatarUrl.startsWith('/uploads/')) {
			return `${baseUrl}${avatarUrl}`;
		} else if (!avatarUrl.startsWith('/')) {
			return `${baseUrl}/uploads/${avatarUrl}`;
		} else {
			return `${baseUrl}${avatarUrl}`;
		}
	};

	return (
		<Card className="space-y-8 bg-background text-card-foreground border border-gray-700 shadow-xl">
			<div className="flex items-center gap-3">
				<User className="w-6 h-6 text-blue-400" />
				<h2 className="text-2xl font-bold">Настройки профиля</h2>
			</div>

			{/* Avatar Section */}
			<div className="flex items-center gap-6 p-6  rounded-lg border border-gray-600">
				<Avatar className="w-24 h-24 border-2 border-gray-600 overflow-hidden rounded-full">
					<AvatarImage src={avatar || undefined} className="rounded-full  object-cover w-full h-full" />
					<AvatarFallback className="text-center text-card-foreground text-[1.5rem] font-bold bg-muted">
						{currentUser?.fullName?.split(' ')[0]?.[0] || ''}
					</AvatarFallback>
				</Avatar>
				<div className="space-y-2">
					<input type="file" accept="image/*" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" />
					<Button
						variant="outline"
						className="bg-background border-gray-600 text-card-foreground hover:bg-gray-600"
						onClick={handleAvatarButton}
						type="button"
						disabled={isUploading}
					>
						<Upload className="w-4 h-4 mr-2" />
						{isUploading ? 'Загрузка...' : 'Загрузить фото'}
					</Button>
					<p className="text-sm text-muted-foreground">Рекомендуемый размер: 200x200px</p>
				</div>
			</div>

			<form onSubmit={handleSubmit} className="space-y-8">
				<div className="space-y-6">
					<h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">Личная информация</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 flex items-center gap-2">
								<User className="w-4 h-4" />
								Имя
							</label>
							<Input
								value={formData.firstName}
								onChange={(e) => handleInputChange('firstName', e.target.value || '')}
								className="bg-background border-gray-600 text-card-foreground placeholder:text-gray-400"
								placeholder="Введите имя"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 flex items-center gap-2">
								<User className="w-4 h-4" />
								Фамилия
							</label>
							<Input
								value={formData.lastName}
								onChange={(e) => handleInputChange('lastName', e.target.value)}
								className="bg-background border-gray-600 text-card-foreground placeholder:text-gray-400"
								placeholder="Введите фамилию"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 flex items-center gap-2">
								<Mail className="w-4 h-4" />
								Email
							</label>
							<Input
								type="email"
								value={formData.email}
								onChange={(e) => handleInputChange('email', e.target.value)}
								className="bg-background border-gray-600 text-card-foreground placeholder:text-gray-400"
								placeholder="Введите email"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 flex items-center gap-2">
								<Phone className="w-4 h-4" />
								Телефон
							</label>
							<Input
								value={formData.phone}
								onChange={(e) => handleInputChange('phone', e.target.value)}
								className="bg-background border-gray-600 text-card-foreground placeholder:text-gray-400"
								placeholder="Введите телефон"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 flex items-center gap-2">
								<Briefcase className="w-4 h-4" />
								Должность
							</label>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										className="w-full justify-between bg-background border-gray-600 text-card-foreground hover:bg-gray-700"
									>
										{formData.position || 'Выберите должность'}
										<ChevronDown className="w-4 h-4 opacity-50" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-full min-w-[200px] bg-background border-gray-600 text-card-foreground">
									{Object.values(Role).map((pos) => (
										<DropdownMenuItem
											key={pos}
											onClick={() => handleInputChange('position', pos)}
											className="hover:bg-gray-700 cursor-pointer"
										>
											{pos}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 flex items-center gap-2">
								<Globe className="w-4 h-4" />
								Язык интерфейса
							</label>
							<Input
								value={formData.language}
								onChange={(e) => handleInputChange('language', e.target.value)}
								className="bg-background border-gray-600 text-card-foreground placeholder:text-gray-400"
								placeholder="Выберите язык"
							/>
						</div>
					</div>
				</div>

				{/* Password */}
				<div className="space-y-6">
					<h3 className="text-lg font-semibold text-card-foreground border-b border-gray-700 pb-2">Изменить пароль</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<label className="text-sm font-medium text-card-foreground">Текущий пароль</label>
							<Input
								type="password"
								value={formData.currentPassword}
								onChange={(e) => handleInputChange('currentPassword', e.target.value)}
								className="bg-background border-gray-600 text-card-foreground placeholder:text-gray-400"
								placeholder="Введите текущий пароль"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300">Новый пароль</label>
							<Input
								type="password"
								value={formData.newPassword}
								onChange={(e) => handleInputChange('newPassword', e.target.value)}
								className="bg-background border-gray-600 text-card-foreground placeholder:text-gray-400"
								placeholder="Введите новый пароль"
							/>
						</div>

						<div className="space-y-2 md:col-span-2">
							<label className="text-sm font-medium text-gray-300">Подтвердите пароль</label>
							<Input
								type="password"
								value={formData.confirmPassword}
								onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
								className="bg-background border-gray-600 text-card-foreground placeholder:text-gray-400"
								placeholder="Подтвердите новый пароль"
							/>
						</div>
					</div>
				</div>

				{/* Submit Button */}
				<div className="flex justify-end pt-6 border-t border-gray-700">
					<Button
						type="submit"
						disabled={isLoading || isLoadingRedux}
						className="bg-blue-600 hover:bg-blue-700 text-card-foreground px-8 py-2"
					>
						<Save className="w-4 h-4 mr-2" />
						{isLoading || isLoadingRedux ? 'Сохранение...' : 'Сохранить изменения'}
					</Button>
				</div>
			</form>
		</Card>
	);
}
