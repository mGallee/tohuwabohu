import { EventLocation, LineupSlot } from '@/constants/event';

export function assertUnreachable(value: never): never {
  throw new Error(`${value} should be unreachable`);
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function getEventSlug(event: {
  title: string;
  startDate: Date;
  location: EventLocation;
}) {
  const { title, startDate, location } = event;
  const dateString = startDate.toISOString().split('T')[0];
  return [
    slugify(title),
    dateString,
    slugify(location.name),
    slugify(location.address.city),
  ].join('-');
}

export function getArtistSlug(artist: { name: string }) {
  return slugify(artist.name);
}

export function formatLineupSlot(slot: LineupSlot, nextSlot?: LineupSlot) {
  const endTime = nextSlot ? nextSlot.startTime : 'END';
  return `${slot.startTime} - ${endTime} ${slot.artist}`;
}

export function getGoogleMapsUrlForEventLocation(location: EventLocation) {
  return `https://www.google.com/maps/search/${encodeURIComponent(`${location.name}, ${location.address.street}, ${location.address.city}, ${location.address.country}`)}`;
}
