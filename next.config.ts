import { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 75, 100],
  },
};

export default withPayload(nextConfig);
