import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCardData } from '@/lib/types/types';
import Image from 'next/image';


const StatCard = ({ title, value, change, icon }: StatCardData) => {
	return (
		<Card className="bg-background border-border text-card-foreground shadow-lg hover:shadow-xl transition-shadow">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium text-card-foreground">{title}</CardTitle>
				{icon && (
					<Image src={icon} alt={`Иконка метрики: ${title}`} width={22} height={22} className="invert opacity-80" />
				)}
			</CardHeader>
			<CardContent>
				<div className="text-3xl font-bold text-card-foreground">{value || '0'}</div>
				<p className="text-xs mt-1 text-muted-foreground">{change}</p>
			</CardContent>
		</Card>
	);
};
export default StatCard;
