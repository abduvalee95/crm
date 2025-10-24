'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyticsData } from '@/lib/data/mock';

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Conversion = () => {
	return (
		<Card className="bg-black border-gray-700 text-white shadow-xl">
			<CardHeader>
				<CardTitle className="text-xl font-semibold">Воронка конверсии</CardTitle>
			</CardHeader>
			<CardContent className="h-[330px] w-full">
				<ResponsiveContainer>
					<LineChart data={analyticsData.revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
						<CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
						<XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
						<YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(value) => `${value}%`} />
						<Tooltip
							contentStyle={{
								backgroundColor: '#1F2937',
								borderColor: '#4B5563',
								color: '#FFFFFF',
								borderRadius: '8px',
							}}
						/>
						<Line
							type="monotone"
							dataKey="revenue"
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
};

export default Conversion;
