import type { Payload } from 'payload';
import path from 'path';
import fs from 'fs';
import { getArtistSlug } from '@/utils/helper';

interface ArtistSeedData {
  name: string;
  description: string;
  profilePicturePath: string;
  soundCloud: {
    username: string;
    trackId: number;
  };
  instagram?: {
    username: string;
  };
  residentAdvisor?: {
    username: string;
  };
}

const ARTISTS_SEED_DATA: ArtistSeedData[] = [
  {
    name: 'Angiko',
    description:
      'Hailing from Vienna, Angiko originally moved to the city to pursue a classical music education in 2017.\n\n' +
      "However, it wasn't long before she fell in love with the vibrant electronic music scene. Drawing inspiration from a wide range of musical styles, Angiko has adopted a genre-fluid approach that aims to create an ecstatic atmosphere. Embracing hard trancy and industrial sounds, Angiko also brings a fierce passion for epic, orchestral tracks to her performances.\n\n" +
      'Her sound is also infused with polyrhythms and tribal melodies, allowing her to tell wild stories while exploring the avant-garde.',
    profilePicturePath: './src/seed/assets/artists/angiko.webp',
    soundCloud: {
      username: 'angi-ko',
      trackId: 2011929343,
    },
    instagram: {
      username: 'angi.ko_',
    },
    residentAdvisor: {
      username: 'angiko-2',
    },
  },
  {
    name: 'Neoom',
    description:
      "Neoom's sound moves between Dark Progressive Psytrance, Psytechno, bushprog, and hypnotic technoid soundscapes, united by consistently darker atmospheres. This diverse approach blends psychedelic textures with modern synth work, creating deep, swampy but driving vibes that keep the dance floor moving.\n\n" +
      'Unbound by genre, the project moves fluidly between styles. The result is a distinctive sonic fingerprint where driving beats meet hypnotic patterns and evolving atmospheres.',
    profilePicturePath: './src/seed/assets/artists/neoom.webp',
    soundCloud: {
      username: 'neoom_vienna',
      trackId: 2012444291,
    },
    instagram: {
      username: 'neoom',
    },
    residentAdvisor: {
      username: 'neoom',
    },
  },
];

export async function seedArtists(payload: Payload) {
  console.log('Seeding artists...');

  for (const artist of ARTISTS_SEED_DATA) {
    try {
      const existing = await payload.find({
        collection: 'artists',
        where: {
          slug: {
            equals: getArtistSlug({ name: artist.name }),
          },
        },
        limit: 1,
      });

      if (existing.docs.length > 0) {
        console.log(`Artist ${artist.name} already exists, skipping...`);
        continue;
      }

      const imagePath = path.resolve(artist.profilePicturePath);

      if (!fs.existsSync(imagePath)) {
        console.warn(
          `Image not found for ${artist.name} at ${imagePath}, skipping...`,
        );
        continue;
      }

      const mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: `${artist.name} profile picture`,
        },
        filePath: imagePath,
        draft: false,
      });

      await payload.create({
        collection: 'artists',
        data: {
          name: artist.name,
          slug: getArtistSlug({ name: artist.name }),
          description: artist.description,
          profilePicture: mediaDoc.id,
          soundCloud: artist.soundCloud,
          instagram: artist.instagram,
          residentAdvisor: artist.residentAdvisor,
        },
        draft: false,
      });

      console.log(`Created artist: ${artist.name}`);
    } catch (error) {
      console.error(`Error seeding artist ${artist.name}:`, error);
    }
  }

  console.log('Artists seeding completed!');
}
