import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	outputFileTracingRoot: require('path').resolve(__dirname, './'),
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3000',
				pathname: '/uploads/**',
			},
		],
	},
};

export default nextConfig;
