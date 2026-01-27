import { MetadataRoute } from 'next';
import { baseUrl } from '@/utils/url';
import { getPayload } from 'payload';
import config from '@payload-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config });
  const events = await payload.find({
    collection: 'events',
    depth: 1,
    limit: 0,
  });
  const artists = await payload.find({
    collection: 'artists',
    depth: 1,
    limit: 0,
  });

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
    ...events.docs.map((event) => ({
      url: `${baseUrl}/events/${event.slug}`,
      priority: 0.8,
      changeFrequency: 'weekly' as const,
      images: [
        ...(event.flyer.front &&
        typeof event.flyer.front === 'object' &&
        event.flyer.front.url
          ? [`${baseUrl}${event.flyer.front.url}`]
          : []),
        ...(event.flyer.back &&
        typeof event.flyer.back === 'object' &&
        event.flyer.back.url
          ? [`${baseUrl}${event.flyer.back.url}`]
          : []),
      ],
    })),
    {
      url: `${baseUrl}/artists`,
      priority: 0.7,
      changeFrequency: 'weekly',
    },
    ...artists.docs.map((artist) => ({
      url: `${baseUrl}/artists/${artist.slug}`,
      priority: 0.7,
      changeFrequency: 'weekly' as const,
      images: [
        ...(artist.profilePicture &&
        typeof artist.profilePicture === 'object' &&
        artist.profilePicture.url
          ? [`${baseUrl}${artist.profilePicture.url}`]
          : []),
      ],
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
