'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserProfile } from '@/lib/interface/settings';
import { Card } from '@/shared/ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Briefcase, Globe, Mail, Phone, Save, Upload, User } from 'lucide-react';
import { useState } from 'react';

// Mock user data
const mockUser: Partial<UserProfile> = {
	firstName: 'Юсуф',
	lastName: 'Администратор',
	email: 'yusuf@crm.ru',
	phone: '+7 (999) 100-10-01',
	position: 'Администратор системы',
	language: 'Русский',
	avatar: 'https://github.com/shadcn.png',
};

export default function ProfileForm() {
	const [formData, setFormData] = useState({
		firstName: mockUser.firstName || '',
		lastName: mockUser.lastName || '',
		email: mockUser.email || '',
		phone: mockUser.phone || '',
		position: mockUser.position || '',
		language: mockUser.language || '',
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	});

	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		console.log('Profile updated:', formData);
		setIsLoading(false);
		// Show success message
	};

	return (
		<Card className="space-y-8 bg-black text-white border border-gray-700 shadow-xl">
			<div className="flex items-center gap-3">
				<User className="w-6 h-6 text-blue-400" />
				<h2 className="text-2xl font-bold">Настройки профиля</h2>
			</div>

			{/* Avatar Section */}
			<div className="flex items-center gap-6 p-6  rounded-lg border border-gray-600">
				<Avatar className="w-24 h-24 border-2 border-gray-600">
					<AvatarImage src={mockUser.avatar} className="object-cover" />
					<AvatarFallback className="text-2xl font-bold bg-gray-700 text-white">
						{mockUser.firstName?.[0]}
						{mockUser.lastName?.[0]}
					</AvatarFallback>
				</Avatar>
				<div className="space-y-2">
					<Button variant="outline" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
						<Upload className="w-4 h-4 mr-2" />
						Загрузить фото
					</Button>
					<p className="text-sm text-gray-400">Рекомендуемый размер: 200x200px</p>
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
								onChange={(e) => handleInputChange('firstName', e.target.value)}
								className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
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
								className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
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
								className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
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
								className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
								placeholder="Введите телефон"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 flex items-center gap-2">
								<Briefcase className="w-4 h-4" />
								Должность
							</label>
							<Input
								value={formData.position}
								onChange={(e) => handleInputChange('position', e.target.value)}
								className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
								placeholder="Введите должность"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 flex items-center gap-2">
								<Globe className="w-4 h-4" />
								Язык интерфейса
							</label>
							<Input
								value={formData.language}
								onChange={(e) => handleInputChange('language', e.target.value)}
								className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
								placeholder="Выберите язык"
							/>
						</div>
					</div>
				</div>

				{/* Password */}
				<div className="space-y-6">
					<h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2">Изменить пароль</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300">Текущий пароль</label>
							<Input
								type="password"
								value={formData.currentPassword}
								onChange={(e) => handleInputChange('currentPassword', e.target.value)}
								className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
								placeholder="Введите текущий пароль"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300">Новый пароль</label>
							<Input
								type="password"
								value={formData.newPassword}
								onChange={(e) => handleInputChange('newPassword', e.target.value)}
								className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
								placeholder="Введите новый пароль"
							/>
						</div>

						<div className="space-y-2 md:col-span-2">
							<label className="text-sm font-medium text-gray-300">Подтвердите пароль</label>
							<Input
								type="password"
								value={formData.confirmPassword}
								onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
								className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
								placeholder="Подтвердите новый пароль"
							/>
						</div>
					</div>
				</div>

				{/* Submit Button */}
				<div className="flex justify-end pt-6 border-t border-gray-700">
					<Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
						<Save className="w-4 h-4 mr-2" />
						{isLoading ? 'Сохранение...' : 'Сохранить изменения'}
					</Button>
				</div>
			</form>
		</Card>
	);
}
