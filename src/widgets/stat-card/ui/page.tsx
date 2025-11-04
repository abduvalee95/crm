import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCardData } from '@/lib/types/types';
import Image from 'next/image';

// Карточка статистики
const StatCard = ({ title, value, change, icon }: StatCardData) => {
	return (
		<Card className="bg-background border-border text-card-foreground shadow-lg">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium text-card-foreground">{title}</CardTitle>
				<Image src={icon} alt={`Иконка метрики: ${title}`} width={22} height={22} className="invert" />
			</CardHeader>
			<CardContent>
				<div className="text-3xl">{value}</div>
				<p className="text-xs mt-1">{change}</p>
			</CardContent>
		</Card>
	);
};
export default StatCard;
