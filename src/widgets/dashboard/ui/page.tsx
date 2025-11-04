'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { salesChartData } from '@/lib/data/mock';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import EventPage from '../events/ui/page';

const DashboardPage = () => (
	<div className="p-4 space-y-6 shadow-lg">
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			{/* График продажa */}
			<Card className="lg:col-span-2  bg-background border-border text-card-foreground shadow-lg">
				<CardHeader>
					<CardTitle>Продажи за неделю</CardTitle>
				</CardHeader>
				<CardContent className="h-[300px] w-full">
					<ResponsiveContainer>
						<LineChart data={salesChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }} className='focus:recharts-wrapper focus:recharts-surface outline-none echarts-wrapper *:focus:outline-none'>
							<CartesianGrid strokeDasharray="3 3" stroke="#aebcd3ff" />
							<XAxis dataKey="name" stroke="gray" fontSize={12} />
							<YAxis stroke="gray" fontSize={12} tickFormatter={(value) => `${value}`} />
							<Tooltip
								contentStyle={{
									backgroundColor: '#0F1115',
									borderColor: '#374151',
									color: '#FFFFFF',
								}}
							/>
							<Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 8 }} />
						</LineChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
			<EventPage />
		</div>
	</div>
);
export default DashboardPage;
