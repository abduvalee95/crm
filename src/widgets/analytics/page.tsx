import { analyticsData } from '@/lib/data/mock'
import CirleStatic from './ui/CirleStatic';
import Conversion from './ui/Conversion';
import EffectiveMeneger from './ui/EffectiveMeneger';
import RevenueDash from './ui/RevenueDash';
import RevenueTable from './ui/RevenueTable';

const AnalyticsBlock = () => {
	return (
		<div className="min-h-screen p-4">
			<div className="max-w-8xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
					<div className="lg:col-span-2">
						<RevenueDash data={analyticsData.revenueData} />
					</div>
					<div className="lg:col-span-2">
						<CirleStatic />
					</div>
					<div className="lg:col-span-2">
						<Conversion data={analyticsData.revenueData} />
					</div>
					<div className="lg:col-span-2">
						<EffectiveMeneger />
					</div>
					<div className="lg:col-span-2 xl:col-span-4">
						<RevenueTable />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnalyticsBlock;
