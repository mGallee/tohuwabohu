import { WithContext, MusicEvent, Person } from 'schema-dts';
import { baseUrl } from '@/utils/url';
import { SOCIAL_MEDIA_ITEMS } from '@/constants/social-media';
import { Event, Artist } from '@/payload-types';

export function generateEventJsonLd(event: Event): WithContext<MusicEvent> {
  const eventUrl = `${baseUrl}/events/${event.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    '@id': eventUrl,
    name: event.title,
    description: event.description,
    url: eventUrl,
    inLanguage: 'en-AT',
    startDate: event.startDate,
    endDate: event.endDate,
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
        availabilityEnds: event.endDate,
        validFrom: event.startDate,
      },
      {
        '@type': 'Offer',
        url: eventUrl,
        price: event.beforeMidnightPrice.toString(),
        priceCurrency: 'EUR',
        name: 'Entry before midnight',
        availability: 'https://schema.org/InStock',
        availabilityEnds: event.endDate,
        validFrom: event.startDate,
        validThrough: new Date(
          new Date(event.startDate).getFullYear(),
          new Date(event.startDate).getMonth(),
          new Date(event.startDate).getDate(),
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
  };
}

export function generateArtistJsonLd(artist: Artist): WithContext<Person> {
  const artistUrl = `${baseUrl}/artists/${artist.slug}`;

  let image: undefined | string;
  if (
    artist.profilePicture &&
    typeof artist.profilePicture === 'object' &&
    artist.profilePicture.url
  ) {
    image = artist.profilePicture.url;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': artistUrl,
    name: artist.name,
    description: artist.description,
    url: artistUrl,
    jobTitle: 'Music Artist',
    image: image,
    sameAs: [
      `https://soundcloud.com/${artist.soundCloud.username}`,
      ...(artist.instagram
        ? [`https://www.instagram.com/${artist.instagram.username}`]
        : []),
      ...(artist.residentAdvisor
        ? [`https://ra.co/dj/${artist.residentAdvisor.username}`]
        : []),
    ],
  };
}
