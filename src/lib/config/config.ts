export const baseUrl=  'http://localhost:3000';

export	const formatAvatarUrl = (avatarPath: string | undefined | null): string => {
	if (!avatarPath) return '';

	// Agar allaqachon to'liq URL bo'lsa
	if (avatarPath.startsWith('http://') || avatarPath.startsWith('https://')) {
		return avatarPath;
	}

	// Remove leading "./" if present
	let normalized = avatarPath.replace(/^\.\//, '');

	// To'liq URL yaratish
	if (normalized.startsWith('/')) {
		return `${baseUrl}${normalized}`;
	} else {
		return `${baseUrl}/${normalized}`;
	}
};