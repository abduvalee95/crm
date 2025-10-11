import Menu from '@/widgets/sidebar/ui/Menu';
import ClientPage from './clients/page';
import HomePage from './home/page';

export default function Home() {
	return (
		<div className="w-full flex text-white bg-black">
				<HomePage />
		</div>
	);
}
