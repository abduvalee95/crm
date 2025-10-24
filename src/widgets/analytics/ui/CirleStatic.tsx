'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const CirleStatic = () => {
	const { leadSources } = require('@/lib/data/mock').analyticsData;

	return (
		<Card className="bg-black border-gray-700 text-white shadow-xl">
			<CardHeader>
				<CardTitle className="text-xl font-semibold">Источники клиентов</CardTitle>
			</CardHeader>
			<CardContent className="h-[330px] w-full">
				<ResponsiveContainer>
					<PieChart>
						<Pie
							data={leadSources}
							cx="50%"
							cy="50%"
							labelLine={true}
							label={({ name, value }) => `${name} ${value}%`}
							outerRadius={100}
							fill="#8884d8"
							dataKey="value"
						>
							{leadSources.map((entry: any, index: number) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								backgroundColor: '#1F2937',
								borderColor: '#4B5563',
								color: '#FFFFFF',
								borderRadius: '8px',
							}}
						/>
					</PieChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
};

export default CirleStatic;
