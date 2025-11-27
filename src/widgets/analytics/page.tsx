'use client';
import { useAppSelector } from '@/shared/store/hooks';
import CirleStatic from './ui/CirleStatic';
import Conversion from './ui/Conversion';
import EffectiveMeneger from './ui/EffectiveMeneger';
import RevenueDash from './ui/RevenueDash';
import RevenueTable from './ui/RevenueTable';

const AnalyticsBlock = () => {
	const revenueData = useAppSelector((s) => s.analytics.revenueData);

	return (
		<div className="min-h-screen p-4">
			<div className="mx-auto max-w-8xl space-y-6">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
					<div className=" lg:col-span-2">
						<RevenueDash data={revenueData} />
					</div>
					<div className="lg:col-span-2">
						<CirleStatic />
					</div>
					<div className="lg:col-span-2">
						<Conversion data={revenueData} />
					</div>
					<div className="lg:col-span-2">
						<EffectiveMeneger />
					</div>
				</div>
					<div className="lg:col-span-2 xl:col-span-4">
						<RevenueTable />
					</div>
			</div>
		</div>
	);
};

export default AnalyticsBlock;
