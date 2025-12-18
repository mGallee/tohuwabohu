import { MetadataRoute } from 'next';
import { baseUrl } from '@/utils/url';
import { ARTISTS_DATA } from '@/constants/artist';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      priority: 0.5,
      changeFrequency: 'weekly',
    },
    {
      url: `${baseUrl}/awareness`,
      priority: 0.5,
      changeFrequency: 'weekly',
    },
    {
      url: `${baseUrl}/imprint`,
      priority: 0.5,
      changeFrequency: 'weekly',
    },
    ...ARTISTS_DATA.map((artist) => ({
      url: `${baseUrl}/artists/${artist.slug}`,
      priority: 0.5,
      changeFrequency: 'weekly' as const,
    })),
  ];
}
