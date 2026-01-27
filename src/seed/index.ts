import { getPayload } from 'payload';
import config from '@/payload.config';
import { seedArtists } from '@/seed/artists';
import { seedEvents } from '@/seed/events';

async function seed() {
  try {
    const payload = await getPayload({ config });
    await seedArtists(payload);
    await seedEvents(payload);
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

await seed();
