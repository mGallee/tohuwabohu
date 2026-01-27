import type { Payload } from 'payload';
import path from 'path';
import fs from 'fs';
import { getEventSlug } from '@/utils/helper';
import { Media } from '@/payload-types';

interface EventSeedData {
  title: string;
  startDate: Date;
  endDate: Date;
  location: {
    name: string;
    address: {
      street: string;
      city: string;
      country: string;
    };
  };
  price: number;
  beforeMidnightPrice: number;
  description: string;
  lineup?: Array<{
    startTime: string;
    artist: string;
  }>;
  flyer: {
    frontPath: string;
    backPath?: string;
  };
}

const EVENTS_SEED_DATA: EventSeedData[] = [
  {
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
      { startTime: '23:00', artist: 'Stoik' },
      { startTime: '00:40', artist: 'David Phoenix' },
      { startTime: '02:25', artist: 'Angiko' },
      { startTime: '04:05', artist: 'Neoom' },
    ],
    flyer: {
      frontPath: './src/seed/assets/flyers/2025-09-06-front.webp',
      backPath: './src/seed/assets/flyers/2025-09-06-back.webp',
    },
  },
  {
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
      { startTime: '23:00', artist: 'Stoik' },
      { startTime: '00:25', artist: 'Mars L' },
      { startTime: '01:50', artist: 'TSDY' },
      { startTime: '03:15', artist: 'Lagos B2B Neoom' },
      { startTime: '04:40', artist: 'Angiko' },
    ],
    flyer: {
      frontPath: './src/seed/assets/flyers/2025-12-12-front.webp',
      backPath: './src/seed/assets/flyers/2025-12-12-back.webp',
    },
  },
  {
    title: 'Tohuwabohu - Psychedelic Edition',
    startDate: new Date('2066/02/06 23:00'),
    endDate: new Date('2066/02/07 06:00'),
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
    flyer: {
      frontPath: './src/seed/assets/flyers/2066-02-06-front.webp',
    },
  },
];

export async function seedEvents(payload: Payload) {
  console.log('Seeding events...');

  for (const event of EVENTS_SEED_DATA) {
    try {
      const existing = await payload.find({
        collection: 'events',
        where: {
          slug: {
            equals: getEventSlug(event),
          },
        },
        limit: 1,
      });

      if (existing.docs.length > 0) {
        console.log(`Event ${event.title} already exists, skipping...`);
        continue;
      }

      const flyerFrontPath = path.resolve(event.flyer.frontPath);
      if (!fs.existsSync(flyerFrontPath)) {
        console.warn(
          `Flyer front not found for ${event.title} at ${flyerFrontPath}, skipping...`,
        );
        continue;
      }

      const flyerFrontDoc = await payload.create({
        collection: 'media',
        data: {
          alt: `${event.title} - Front Flyer`,
        },
        filePath: flyerFrontPath,
        draft: false,
      });

      let flyerBackDoc: Media | undefined;
      if (event.flyer.backPath) {
        const flyerBackPath = path.resolve(event.flyer.backPath);
        if (fs.existsSync(flyerBackPath)) {
          flyerBackDoc = await payload.create({
            collection: 'media',
            data: {
              alt: `${event.title} - Back Flyer`,
            },
            filePath: flyerBackPath,
            draft: false,
          });
        }
      }

      await payload.create({
        collection: 'events',
        data: {
          slug: getEventSlug(event),
          title: event.title,
          startDate: event.startDate.toISOString(),
          endDate: event.endDate.toISOString(),
          location: event.location,
          price: event.price,
          beforeMidnightPrice: event.beforeMidnightPrice,
          description: event.description,
          lineup: event.lineup,
          flyer: {
            front: flyerFrontDoc.id,
            back: flyerBackDoc ? flyerBackDoc.id : null,
          },
        },
        draft: false,
      });

      console.log(`Created event: ${event.title}`);
    } catch (error) {
      console.error(`Error seeding event ${event.title}:`, error);
    }
  }

  console.log('Events seeding completed!');
}
