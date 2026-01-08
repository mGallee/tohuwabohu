import { WithContext, MusicEvent } from 'schema-dts';
import { PublishedEvent } from '@/constants/event';
import { SOCIAL_MEDIA_ITEMS } from '@/constants/social-media';
import { getEventSlug } from '@/utils/helper';
import { baseUrl } from '@/utils/url';

export function generateEventJsonLd(
  event: PublishedEvent,
): WithContext<MusicEvent> {
  const eventUrl = `${baseUrl}/events/${getEventSlug(event)}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: event.title,
    description: event.description,
    startDate: event.startDate.toISOString(),
    endDate: event.endDate.toISOString(),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'MusicVenue',
      name: event.location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.location.address.street,
        addressLocality: event.location.address.city,
        addressCountry: event.location.address.country,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Tohuwabohu Kultur- und Musikverein',
      url: baseUrl,
      sameAs: SOCIAL_MEDIA_ITEMS.map((item) => item.href),
    },
    offers: [
      {
        '@type': 'Offer',
        price: event.price.toString(),
        priceCurrency: 'EUR',
        name: 'Regular Entry',
        availability: 'https://schema.org/InStock',
        availabilityEnds: event.endDate.toISOString(),
        validFrom: event.startDate.toISOString(),
      },
      {
        '@type': 'Offer',
        price: event.beforeMidnightPrice.toString(),
        priceCurrency: 'EUR',
        name: 'Entry before midnight',
        availability: 'https://schema.org/InStock',
        availabilityEnds: event.endDate.toISOString(),
        validFrom: event.startDate.toISOString(),
        validThrough: new Date(
          event.startDate.getFullYear(),
          event.startDate.getMonth(),
          event.startDate.getDate(),
          23,
          59,
          59,
        ).toISOString(),
      },
    ],
    ...(event.lineup && {
      performer: event.lineup.map((slot) => ({
        '@type': 'Person',
        name: slot.artist,
      })),
    }),
    image: [
      `${baseUrl}${event.flyer.front.src}`,
      ...(event.flyer.back ? [`${baseUrl}${event.flyer.back.src}`] : []),
    ],
    url: eventUrl,
    inLanguage: 'en-AT',
  };
}
