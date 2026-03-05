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
  location: {
    name: string;
    address: {
      city: string;
    };
  };
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

export function getGoogleMapsUrlForEventLocation(location: {
  name: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
}) {
  return `https://www.google.com/maps/search/${encodeURIComponent(`${location.name}, ${location.address.street}, ${location.address.city}, ${location.address.country}`)}`;
}

export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ').trim();
}

export function getInstagramProfileUrl(username: string) {
  return `https://www.instagram.com/${username}`;
}

export function getInstagramMessageUrl(username: string) {
  return `https://ig.me/m/${username}`;
}

export function getFacebookProfileUrl(username: string) {
  return `https://www.facebook.com/${username}`;
}

export function getResidentAdvisorDJProfileUrl(username: string) {
  return `https://ra.co/dj/${username}`;
}

export function getResidentAdvisorPromoterProfileUrl(promoterId: string) {
  return `https://de.ra.co/promoters/${promoterId}`;
}

export function getTelegramProfileUrl(username: string) {
  return `https://t.me/${username}`;
}

export function getSoundCloudProfileUrl(username: string) {
  return `https://soundcloud.com/${username}`;
}
