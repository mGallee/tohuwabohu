import { MetadataRoute } from 'next';
import { baseUrl } from '@/utils/url';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      priority: 0.5,
      changeFrequency: 'weekly',
    },
  ];
}
