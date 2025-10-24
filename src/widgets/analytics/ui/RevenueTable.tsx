'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RevenueTable = () => {
	const tableData = [
		{
			source: 'Реклама в интерн',
			clients: 89,
			deals: 64,
			revenue: 4250000,
			conversion: 72,
			avgCheck: 66406,
		},
		{
			source: 'Рекомендации',
			clients: 71,
			deals: 58,
			revenue: 3890000,
			conversion: 82,
			avgCheck: 67069,
		},
		{
			source: 'Холодные звонки',
			clients: 46,
			deals: 28,
			revenue: 1680000,
			conversion: 61,
			avgCheck: 60000,
		},
		{
			source: 'Выставки',
			clients: 31,
			deals: 25,
			revenue: 1950000,
			conversion: 81,
			avgCheck: 78000,
		},
		{
			source: 'Партнеры',
			clients: 18,
			deals: 15,
			revenue: 1105000,
			conversion: 83,
			avgCheck: 73667,
		},
	];

	return (
		<Card className="bg-black border-gray-700 text-white shadow-xl">
			<CardHeader>
				<CardTitle className="text-xl font-semibold">Сводная таблица по источникам</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-gray-700">
								<th className="text-left py-3 px-4 font-semibold text-gray-300">Источник</th>
								<th className="text-right py-3 px-4 font-semibold text-gray-300">Клиенты</th>
								<th className="text-right py-3 px-4 font-semibold text-gray-300">Сделки</th>
								<th className="text-right py-3 px-4 font-semibold text-gray-300">Доход</th>
								<th className="text-right py-3 px-4 font-semibold text-gray-300">Конверсия</th>
								<th className="text-right py-3 px-4 font-semibold text-gray-300">Средний чек</th>
							</tr>
						</thead>
						<tbody>
							{tableData.map((row, index) => (
								<tr key={index} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
									<td className="py-4 px-4 font-medium text-white">{row.source}</td>
									<td className="py-4 px-4 text-right text-gray-300">{row.clients}</td>
									<td className="py-4 px-4 text-right text-gray-300">{row.deals}</td>
									<td className="py-4 px-4 text-right text-green-400 font-semibold">₽{row.revenue.toLocaleString()}</td>
									<td className="py-4 px-4 text-right">
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium ${
												row.conversion >= 80
													? 'bg-green-100 text-green-800'
													: row.conversion >= 70
													? 'bg-blue-100 text-blue-800'
													: 'bg-yellow-100 text-yellow-800'
											}`}
										>
											{row.conversion}%
										</span>
									</td>
									<td className="py-4 px-4 text-right text-gray-300">₽{row.avgCheck.toLocaleString()}</td>
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr className="border-t-2 border-gray-600 bg-gray-900/50">
								<td className="py-4 px-4 font-bold text-white">Итого</td>
								<td className="py-4 px-4 text-right font-bold text-white">
									{tableData.reduce((sum, row) => sum + row.clients, 0)}
								</td>
								<td className="py-4 px-4 text-right font-bold text-white">
									{tableData.reduce((sum, row) => sum + row.deals, 0)}
								</td>
								<td className="py-4 px-4 text-right font-bold text-green-400">
									₽{tableData.reduce((sum, row) => sum + row.revenue, 0).toLocaleString()}
								</td>
								<td className="py-4 px-4 text-right font-bold text-white">
									{Math.round(
										(tableData.reduce((sum, row) => sum + row.deals, 0) /
											tableData.reduce((sum, row) => sum + row.clients, 0)) *
											100,
									)}
									%
								</td>
								<td className="py-4 px-4 text-right font-bold text-white">
									₽
									{Math.round(
										tableData.reduce((sum, row) => sum + row.revenue, 0) /
											tableData.reduce((sum, row) => sum + row.deals, 0),
									).toLocaleString()}
								</td>
							</tr>
						</tfoot>
					</table>
				</div>
			</CardContent>
		</Card>
	);
};

export default RevenueTable;
