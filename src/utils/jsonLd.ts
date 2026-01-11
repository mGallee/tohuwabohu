import { WithContext, MusicEvent, Person } from 'schema-dts';
import { PublishedEvent } from '@/constants/event';
import { SOCIAL_MEDIA_ITEMS } from '@/constants/social-media';
import { getEventSlug } from '@/utils/helper';
import { baseUrl } from '@/utils/url';
import { Artist } from '@/constants/artist';

export function generateEventJsonLd(
  event: PublishedEvent,
): WithContext<MusicEvent> {
  const eventUrl = `${baseUrl}/events/${getEventSlug(event)}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    '@id': eventUrl,
    name: event.title,
    description: event.description,
    url: eventUrl,
    inLanguage: 'en-AT',
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
        url: eventUrl,
        price: event.price.toString(),
        priceCurrency: 'EUR',
        name: 'Regular Entry',
        availability: 'https://schema.org/InStock',
        availabilityEnds: event.endDate.toISOString(),
        validFrom: event.startDate.toISOString(),
      },
      {
        '@type': 'Offer',
        url: eventUrl,
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
    performer:
      event.lineup && event.lineup.length > 0
        ? event.lineup.map((slot) => ({
            '@type': 'Person',
            name: slot.artist,
          }))
        : {
            '@type': 'Person',
            name: 'To be announced',
          },
    image: [
      `${baseUrl}${event.flyer.front.src}`,
      ...(event.flyer.back ? [`${baseUrl}${event.flyer.back.src}`] : []),
    ],
  };
}

export function generateArtistJsonLd(artist: Artist): WithContext<Person> {
  const artistUrl = `${baseUrl}/artists/${artist.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': artistUrl,
    name: artist.name,
    description: artist.description,
    url: artistUrl,
    jobTitle: 'Music Artist',
    image: `${baseUrl}${artist.profilePicture.src}`,
    sameAs: `https://soundcloud.com/${artist.soundCloud.username}`,
  };
}
