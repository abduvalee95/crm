export interface UserProfile {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	avatar?: string;
	position: string;
	department: string;
	role: UserRole;
	permissions: Permission[];
	preferences: UserPreferences;
	lastLogin?: string;
	createdAt: string;
	updatedAt: string;
	isActive: boolean;
	timezone: string;
	language: string;
}

export interface UserRole {
	id: string;
	name: string;
	description: string;
	permissions: Permission[];
	isSystemRole: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface Permission {
	id: string;
	name: string;
	description: string;
	category: PermissionCategory;
	resource: string;
	action: PermissionAction;
}

export interface UserPreferences {
	theme: 'light' | 'dark' | 'auto';
	notifications: NotificationPreferences;
	dashboard: DashboardPreferences;
	email: EmailPreferences;
	calendar: CalendarPreferences;
	general: GeneralPreferences;
}

export interface NotificationPreferences {
	email: boolean;
	push: boolean;
	sms: boolean;
	desktop: boolean;
	categories: {
		deals: boolean;
		tasks: boolean;
		messages: boolean;
		system: boolean;
		marketing: boolean;
	};
	frequency: 'immediate' | 'daily' | 'weekly' | 'never';
}

export interface DashboardPreferences {
	layout: 'grid' | 'list';
	widgets: string[];
	refreshInterval: number;
	defaultView: 'overview' | 'analytics' | 'tasks' | 'deals';
}

export interface EmailPreferences {
	signature: string;
	replyTo: string;
	cc: string[];
	bcc: string[];
	template: string;
	autoReply: boolean;
}

export interface CalendarPreferences {
	workingHours: {
		start: string;
		end: string;
		days: number[];
	};
	timezone: string;
	reminders: {
		beforeMeeting: number;
		beforeDeadline: number;
	};
	integration: string[];
}

export interface GeneralPreferences {
	dateFormat: string;
	timeFormat: '12h' | '24h';
	currency: string;
	numberFormat: string;
	language: string;
}

export interface Notification {
	id: string;
	userId: string;
	title: string;
	message: string;
	type: NotificationType;
	category: NotificationCategory;
	priority: NotificationPriority;
	isRead: boolean;
	isArchived: boolean;
	actionUrl?: string;
	actionText?: string;
	metadata?: Record<string, any>;
	createdAt: string;
	readAt?: string;
	expiresAt?: string;
}

export interface Integration {
	id: string;
	name: string;
	type: IntegrationType;
	status: IntegrationStatus;
	config: IntegrationConfig;
	credentials: IntegrationCredentials;
	lastSync?: string;
	syncFrequency: number;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	userId: string;
}

export interface IntegrationConfig {
	baseUrl?: string;
	apiVersion?: string;
	timeout?: number;
	retryAttempts?: number;
	webhookUrl?: string;
	webhookSecret?: string;
	customFields?: Record<string, any>;
}

export interface IntegrationCredentials {
	apiKey?: string;
	secretKey?: string;
	accessToken?: string;
	refreshToken?: string;
	username?: string;
	password?: string;
	clientId?: string;
	clientSecret?: string;
	encrypted: boolean;
}

// Enums
export enum PermissionCategory {
	READ = 'read',
	WRITE = 'write',
	DELETE = 'delete',
	ADMIN = 'admin',
	CUSTOM = 'custom',
}

export enum PermissionAction {
	CREATE = 'create',
	READ = 'read',
	UPDATE = 'update',
	DELETE = 'delete',
	EXPORT = 'export',
	IMPORT = 'import',
	MANAGE = 'manage',
}

export enum NotificationType {
	INFO = 'info',
	SUCCESS = 'success',
	WARNING = 'warning',
	ERROR = 'error',
	DEAL = 'deal',
	TASK = 'task',
	MESSAGE = 'message',
	SYSTEM = 'system',
}

export enum NotificationCategory {
	DEALS = 'deals',
	TASKS = 'tasks',
	MESSAGES = 'messages',
	SYSTEM = 'system',
	MARKETING = 'marketing',
	INTEGRATIONS = 'integrations',
	SECURITY = 'security',
}

export enum NotificationPriority {
	LOW = 'low',
	MEDIUM = 'medium',
	HIGH = 'high',
	URGENT = 'urgent',
}

export enum IntegrationType {
	EMAIL = 'email',
	CALENDAR = 'calendar',
	CRM = 'crm',
	MARKETING = 'marketing',
	ANALYTICS = 'analytics',
	PAYMENT = 'payment',
	SOCIAL = 'social',
	STORAGE = 'storage',
	CUSTOM = 'custom',
}

export enum IntegrationStatus {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
	PENDING = 'pending',
	ERROR = 'error',
	SYNCING = 'syncing',
	DISCONNECTED = 'disconnected',
}
