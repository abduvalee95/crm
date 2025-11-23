export enum ClientStatus {
	active = 'Активен',
	new = 'Новый',
	inactive = 'Неактивен',
}
export enum EmployeeStatus {
	active = 'Активен',
	on_leave = 'Неактивен',
}

export enum TaskStatus {
	PENDING = 'pending',
	IN_PROGRESS = 'in_progress',
	COMPLETED = 'completed',
	CANCELLED = 'cancelled',
}

export enum OnlineStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  AWAY = 'away',
  BUSY = 'busy'
}

export enum Role{
  ADMIN = 'admin',
  MANAGER = 'manager',
  ANALYST = 'analyst',
  SUPPORT = 'support',
  USER = 'user'
}

export enum Performance{
  EXCELLENT = 'excellent',
  GOOD = 'good',
  AVERAGE = 'average',
  NEEDS_IMPROVEMENT = 'needs_improvement'
}