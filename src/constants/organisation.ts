import { getBaseUrl } from '@/utils/url';

export const ORGANISATION = {
  name: 'Tohuwabohu',
  alternateName: 'Tohuwabohu Kultur- und Musikverein',
  legalName: 'TOHUWABOHU Kultur- und Musikverein',
  description:
    'Vienna-based collective creating music and art events with high-quality sound, handcrafted visuals, and an open, inclusive space to connect, feel safe, and be yourself.',
  url: getBaseUrl(),
  logo: {
    url: `${getBaseUrl()}/images/logo-open-graph.png`,
    width: 1080,
    height: 1080,
  },
  address: {
    streetAddress: 'Marktgasse 6/1/22-23',
    locality: 'Vienna',
    region: 'Vienna',
    postalCode: '1090',
    country: 'Austria',
  },
  ZVR: 1870005453,
  email: 'team@tohuwabohu.wien',
} as const;
