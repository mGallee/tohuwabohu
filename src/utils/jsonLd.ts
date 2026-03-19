import { WithContext, MusicEvent, Person, Offer } from 'schema-dts';
import { SOCIAL_MEDIA_ITEMS } from '@/constants/social-media';
import { Event, Artist } from '@/payload-types';
import {
  getInstagramProfileUrl,
  getResidentAdvisorDJProfileUrl,
  getSoundCloudProfileUrl,
} from '@/utils/helper';
import { ORGANISATION } from '@/constants/organisation';
import { BASE_URL } from '@/constants/url';

export function generateEventJsonLd(event: Event): WithContext<MusicEvent> {
  const eventUrl = `${BASE_URL}/events/${event.slug}`;
  const offers: Offer[] = [
    {
      '@type': 'Offer',
      url: eventUrl,
      price: event.price.toFixed(2),
      priceCurrency: 'EUR',
      name: 'Regular Entry',
      availability: 'https://schema.org/InStock',
      availabilityEnds: event.endDate,
      validFrom: event.startDate,
    },
  ];
  if (typeof event.beforeMidnightPrice === 'number') {
    offers.push({
      '@type': 'Offer',
      url: eventUrl,
      price: event.beforeMidnightPrice.toFixed(2),
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
    });
  }

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
      '@id': `${ORGANISATION.url}/#organization`,
      name: ORGANISATION.name,
      alternateName: ORGANISATION.alternateName,
      url: BASE_URL,
      description: ORGANISATION.description,
      logo: {
        '@type': 'ImageObject',
        url: ORGANISATION.logo.url,
        width: ORGANISATION.logo.width.toString(),
        height: ORGANISATION.logo.height.toString(),
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: ORGANISATION.address.streetAddress,
        addressLocality: ORGANISATION.address.locality,
        addressRegion: ORGANISATION.address.region,
        postalCode: ORGANISATION.address.postalCode,
        addressCountry: ORGANISATION.address.country,
      },
      sameAs: SOCIAL_MEDIA_ITEMS.map((item) => item.href),
    },
    offers: offers,
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
        ? [`${BASE_URL}${event.flyer.front.url}`]
        : []),
      ...(event.flyer.back &&
      typeof event.flyer.back === 'object' &&
      event.flyer.back.url
        ? [`${BASE_URL}${event.flyer.back.url}`]
        : []),
    ],
  };
}

export function generateArtistJsonLd(artist: Artist): WithContext<Person> {
  const artistUrl = `${BASE_URL}/artists/${artist.slug}`;

  let image: undefined | string;
  if (
    artist.profilePicture &&
    typeof artist.profilePicture === 'object' &&
    artist.profilePicture.url
  ) {
    image = `${BASE_URL}${artist.profilePicture.url}`;
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
      getSoundCloudProfileUrl(artist.soundCloud.username),
      ...(artist.instagram?.username && artist.instagram.username.length > 0
        ? [getInstagramProfileUrl(artist.instagram.username)]
        : []),
      ...(artist.residentAdvisor?.username &&
      artist.residentAdvisor.username.length > 0
        ? [getResidentAdvisorDJProfileUrl(artist.residentAdvisor.username)]
        : []),
    ],
  };
}
