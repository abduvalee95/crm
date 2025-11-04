'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const CirleStatic = () => {
	const { leadSources } = require('@/lib/data/mock').analyticsData;

	return (
		<Card className="bg-background text-card-foreground border-border shadow-xl">
			<CardHeader>
				<CardTitle className="text-xl font-semibold">Источники клиентов</CardTitle>
			</CardHeader>
			<CardContent className="h-[330px] w-full">
				<ResponsiveContainer>
					<PieChart className="focus:recharts-wrapper focus:recharts-surface outline-none echarts-wrapper *:focus:outline-none">
						<Pie
							data={leadSources}
							cx="50%"
							cy="50%"
							labelLine={true}
							label={({ name, value }) => `${name} ${value}%`}
							outerRadius={100}
							fill="#8884d8"
							dataKey="value"
							className="focus:recharts-wrapper focus:recharts-surface outline-none echarts-wrapper *:focus:outline-none"
						>
							{leadSources.map((entry: any, index: number) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								backgroundColor: 'hsl(var(--card))',
								borderColor: 'hsl(var(--border))',
								color: 'hsl(var(--card-foreground))',
								borderRadius: '8px',
								border: 'none',
							}}
						/>
					</PieChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
};

export default CirleStatic;
