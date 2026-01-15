import { StaticImageData } from 'next/image';
import Flyer20250222Front from '@/assets/flyers/2025-02-22-front.webp';
import Flyer20250222Back from '@/assets/flyers/2025-02-22-back.webp';
import Flyer20250419Front from '@/assets/flyers/2025-04-19-front.webp';
import Flyer20250419Back from '@/assets/flyers/2025-04-19-back.webp';
import Flyer20250906Front from '@/assets/flyers/2025-09-06-front.webp';
import Flyer20250906Back from '@/assets/flyers/2025-09-06-back.webp';
import Flyer20251212Front from '@/assets/flyers/2025-12-12-front.webp';
import Flyer20251212Back from '@/assets/flyers/2025-12-12-back.webp';
import Flyer20260206Front from '@/assets/flyers/2026-02-06-front.webp';
import Flyer20260206Back from '@/assets/flyers/2026-02-06-back.webp';

export interface EventLocation {
  name: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
}

export interface LineupSlot {
  startTime: string;
  artist: string;
}

export interface AnnouncedEvent {
  type: 'announced';
  title: string;
  startDate: Date;
  endDate: Date;
  location: EventLocation;
}

export interface PublishedEvent {
  type: 'published';
  title: string;
  startDate: Date;
  endDate: Date;
  location: EventLocation;
  price: number;
  beforeMidnightPrice: number;
  description: string;
  lineup?: LineupSlot[];
  flyer: {
    front: StaticImageData;
    back?: StaticImageData;
  };
}

export type Event = AnnouncedEvent | PublishedEvent;

export const EVENTS_DATA: Event[] = [
  {
    type: 'published',
    title: 'Tohuwabohu - Psychedelic Edition',
    startDate: new Date('2025/02/22 22:00'),
    endDate: new Date('2025/02/23 06:00'),
    location: {
      name: 'Flucc Deck',
      address: {
        street: 'Praterstern 5',
        city: 'Vienna',
        country: 'Austria',
      },
    },
    price: 12,
    beforeMidnightPrice: 10,
    description:
      '⭐ come as you are / come as you wish\n' +
      '⭐ decoration & visuals\n' +
      '⭐ Awareness-Team\n' +
      'Join us for a wild night @Flucc with Tohuwabohu and immerse yourself in a diverse mix of sounds within the psychedelic spectrum.',
    lineup: [
      {
        startTime: '22:00',
        artist: 'Angiko',
      },
      {
        startTime: '23:30',
        artist: 'Bonobros',
      },
      {
        startTime: '01:00',
        artist: 'Stoik',
      },
      {
        startTime: '02:30',
        artist: 'Fullgas',
      },
      {
        startTime: '04:00',
        artist: 'Camsis',
      },
    ],
    flyer: {
      front: Flyer20250222Front,
      back: Flyer20250222Back,
    },
  },
  {
    type: 'published',
    title: 'Tohuwabohu - Technoid Edition',
    startDate: new Date('2025/04/19 22:30'),
    endDate: new Date('2025/04/20 06:00'),
    location: {
      name: 'Flucc Deck',
      address: {
        street: 'Praterstern 5',
        city: 'Vienna',
        country: 'Austria',
      },
    },
    price: 12,
    beforeMidnightPrice: 10,
    description:
      '⭐ Come as you are\n' +
      '⭐ Decorations & visuals\n' +
      '⭐ Awareness team\n' +
      '⭐ No forms of discrimination are accepted\n' +
      'Join us for a wild night at @Flucc with Tohuwabohu, and dive into a diverse mix of sounds within the technoid spectrum.',
    lineup: [
      {
        startTime: '22:30',
        artist: 'Marsl',
      },
      {
        startTime: '00:00',
        artist: 'Neoom B2B Exonot',
      },
      {
        startTime: '01:30',
        artist: 'Angiko',
      },
      {
        startTime: '03:00',
        artist: 'Leen Tilt',
      },
      {
        startTime: '04:30',
        artist: 'Stoik B2B Remnant',
      },
    ],
    flyer: {
      front: Flyer20250419Front,
      back: Flyer20250419Back,
    },
  },
  {
    type: 'published',
    title: 'Tohuwabohu - Technoid Edition',
    startDate: new Date('2025/09/06 23:00'),
    endDate: new Date('2025/09/07 06:00'),
    location: {
      name: 'Flucc Deck',
      address: {
        street: 'Praterstern 5',
        city: 'Vienna',
        country: 'Austria',
      },
    },
    price: 12,
    beforeMidnightPrice: 10,
    description:
      '⭐ Come as you are\n' +
      '⭐ Decorations & visuals\n' +
      '⭐ Awareness team\n' +
      '⭐ No forms of discrimination are accepted\n' +
      'Join us for a wild night at @Flucc and dive into a diverse mix of sounds within the technoid spectrum.',
    lineup: [
      {
        startTime: '23:00',
        artist: 'Stoik',
      },
      {
        startTime: '00:40',
        artist: 'David Phoenix',
      },
      {
        startTime: '02:25',
        artist: 'Angiko',
      },
      {
        startTime: '04:05',
        artist: 'Neoom',
      },
    ],
    flyer: {
      front: Flyer20250906Front,
      back: Flyer20250906Back,
    },
  },
  {
    type: 'published',
    title: 'Tohuwabohu - Technoid Edition',
    startDate: new Date('2025/12/12 23:00'),
    endDate: new Date('2025/12/13 06:00'),
    location: {
      name: 'Club Lucia',
      address: {
        street: 'U-Bahnbögen 24/25',
        city: 'Vienna',
        country: 'Austria',
      },
    },
    price: 12,
    beforeMidnightPrice: 10,
    description:
      'Join us for a wild night @Lucia with Tohuwabohu and immerse yourself in a diverse mix of sounds within the technoid spectrum.\n' +
      '⭐ Come as you are / come as you wish\n' +
      '⭐ Decoration & Visuals\n' +
      '⭐ Awareness-Team',
    lineup: [
      {
        startTime: '23:00',
        artist: 'Stoik',
      },
      {
        startTime: '00:25',
        artist: 'Mars L',
      },
      {
        startTime: '01:50',
        artist: 'TSDY',
      },
      {
        startTime: '03:15',
        artist: 'Lagos B2B Neoom',
      },
      {
        startTime: '04:40',
        artist: 'Angiko',
      },
    ],
    flyer: {
      front: Flyer20251212Front,
      back: Flyer20251212Back,
    },
  },
  {
    type: 'published',
    title: 'Tohuwabohu - Psychedelic Edition',
    startDate: new Date('2026/02/06 23:00'),
    endDate: new Date('2026/02/07 06:00'),
    location: {
      name: 'Flucc Wanne',
      address: {
        street: 'Praterstern 5',
        city: 'Vienna',
        country: 'Austria',
      },
    },
    price: 18,
    beforeMidnightPrice: 15,
    description:
      'Join us for a wild night @Flucc Wanne with Tohuwabohu and immerse yourself in a diverse mix of sounds within the psychedelic spectrum.\n' +
      '⭐ Come as you are / come as you wish\n' +
      '⭐ Decoration & Visuals\n' +
      '⭐ Awareness-Team',
    lineup: [
      {
        startTime: '23:00',
        artist: 'Numa B2B Angiko',
      },
      {
        startTime: '00:25',
        artist: 'Stoik',
      },
      {
        startTime: '01:50',
        artist: 'Brandmann',
      },
      {
        startTime: '03:15',
        artist: 'Krawallkasper B2B Exonot',
      },
      {
        startTime: '04:40',
        artist: 'Neoom B2B Lagos',
      },
    ],
    flyer: {
      front: Flyer20260206Front,
      back: Flyer20260206Back,
    },
  },
] as const;
