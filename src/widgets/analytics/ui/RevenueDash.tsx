'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Point = { name: string; revenue: number; profit: number };

const RevenueDash = ({ data }: { data: Point[] }) => (
	<Card className="bg-background text-card-foreground border-border shadow-xl">
		<CardHeader>
			<CardTitle className="text-xl font-semibold">Доходы</CardTitle>
		</CardHeader>
		<CardContent className="h-[330px]">
			<ResponsiveContainer>
				<LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} className="focus:recharts-wrapper focus:recharts-surface outline-none echarts-wrapper *:focus:outline-none">
				<CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
					<XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
					<YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(value) => `₽${value}к`} />
					<Tooltip
						contentStyle={{
							backgroundColor: '#1F2937',
							borderColor: '#4B5563',
							color: '#FFFFFF',
							borderRadius: '8px',
						}}
						formatter={(value, name) => [`₽${value}к`, name === 'revenue' ? 'Доход' : 'Прибыль']}
					/>
					<Line
						type="monotone"
						dataKey="revenue"
						stroke="#3B82F6"
						strokeWidth={3}
						activeDot={{ r: 6, fill: '#3B82F6' }}
						dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
					/>
					<Line
						type="monotone"
						dataKey="profit"
						stroke="#10B981"
						strokeWidth={3}
						activeDot={{ r: 6, fill: '#10B981' }}
						dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</CardContent>
	</Card>
);
export default RevenueDash;
