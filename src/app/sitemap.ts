import { MetadataRoute } from 'next';
import { baseUrl } from '@/utils/url';
import { ARTISTS_DATA } from '@/constants/artist';
import { EVENTS_DATA } from '@/constants/event';
import { getArtistSlug, getEventSlug } from '@/utils/helper';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      priority: 1,
      changeFrequency: 'weekly',
    },
    {
      url: `${baseUrl}/events`,
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    ...EVENTS_DATA.filter((event) => event.type === 'published').map(
      (event) => ({
        url: `${baseUrl}/events/${getEventSlug(event)}`,
        priority: 0.8,
        changeFrequency: 'weekly' as const,
        images: [
          `${baseUrl}${event.flyer.front.src}`,
          ...(event.flyer.back ? [`${baseUrl}${event.flyer.back.src}`] : []),
        ],
      }),
    ),
    {
      url: `${baseUrl}/artists`,
      priority: 0.7,
      changeFrequency: 'weekly',
    },
    ...ARTISTS_DATA.map((artist) => ({
      url: `${baseUrl}/artists/${getArtistSlug(artist)}`,
      priority: 0.7,
      changeFrequency: 'weekly' as const,
      images: [`${baseUrl}${artist.profilePicture.src}`],
    })),
    {
      url: `${baseUrl}/awareness`,
      priority: 0.6,
      changeFrequency: 'monthly',
    },
    {
      url: `${baseUrl}/decoration`,
      priority: 0.5,
      changeFrequency: 'weekly',
    },
    {
      url: `${baseUrl}/imprint`,
      priority: 0.3,
      changeFrequency: 'monthly',
    },
  ];
}
