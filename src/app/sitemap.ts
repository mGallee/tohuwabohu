import { MetadataRoute } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import { DECO_IMAGES } from '@/constants/decoration';
import { BASE_URL } from '@/constants/url';

export const revalidate = 3600;

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
      url: BASE_URL,
      priority: 1,
      changeFrequency: 'weekly',
    },
    {
      url: `${BASE_URL}/events`,
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    ...events.docs.map((event) => ({
      url: `${BASE_URL}/events/${event.slug}`,
      priority: 0.8,
      changeFrequency: 'weekly' as const,
      lastModified: event.updatedAt,
      images: [
        ...(event.flyer.front &&
        typeof event.flyer.front === 'object' &&
        event.flyer.front.url
          ? [`${BASE_URL}${event.flyer.front.url}`]
          : []),
        ...(event.flyer.back &&
        typeof event.flyer.back === 'object' &&
        event.flyer.back.url
          ? [`${BASE_URL}${event.flyer.back.url}`]
          : []),
      ],
    })),
    {
      url: `${BASE_URL}/artists`,
      priority: 0.7,
      changeFrequency: 'weekly',
    },
    ...artists.docs.map((artist) => ({
      url: `${BASE_URL}/artists/${artist.slug}`,
      priority: 0.7,
      changeFrequency: 'weekly' as const,
      lastModified: artist.updatedAt,
      images: [
        ...(artist.profilePicture &&
        typeof artist.profilePicture === 'object' &&
        artist.profilePicture.url
          ? [`${BASE_URL}${artist.profilePicture.url}`]
          : []),
      ],
    })),
    {
      url: `${BASE_URL}/awareness`,
      priority: 0.6,
      changeFrequency: 'monthly',
    },
    {
      url: `${BASE_URL}/decoration`,
      priority: 0.6,
      changeFrequency: 'weekly',
      images: DECO_IMAGES.map((image) => `${BASE_URL}${image.src}`),
    },
    {
      url: `${BASE_URL}/about-us`,
      priority: 0.5,
      changeFrequency: 'monthly',
    },
    {
      url: `${BASE_URL}/imprint`,
      priority: 0.3,
      changeFrequency: 'monthly',
    },
  ];
}
