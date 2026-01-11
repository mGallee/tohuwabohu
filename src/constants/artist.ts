import { StaticImageData } from 'next/image';
import Angiko from '@/assets/artists/angiko.webp';
import Neoom from '@/assets/artists/neoom.webp';
import Stoik from '@/assets/artists/stoik.webp';
import Fullgas from '@/assets/artists/fullgas.webp';
import MarsL from '@/assets/artists/mars-l.webp';
import Bonobros from '@/assets/artists/bonobros.webp';
import Remnant from '@/assets/artists/remnant.webp';

export interface Artist {
  slug: string;
  name: string;
  description: string;
  profilePicture: StaticImageData;
  soundCloud: {
    username: string;
    trackId: number;
  };
}

export const ARTISTS_DATA: Artist[] = [
  {
    slug: 'angiko',
    name: 'Angiko',
    description:
      'Hailing from Vienna, Angiko originally moved to the city to pursue a classical music education in 2017.\n\n' +
      "However, it wasn't long before she fell in love with the vibrant electronic music scene. Drawing inspiration from a wide range of musical styles, Angiko has adopted a genre-fluid approach that aims to create an ecstatic atmosphere. Embracing hard trancy and industrial sounds, Angiko also brings a fierce passion for epic, orchestral tracks to her performances.\n\n" +
      'Her sound is also infused with polyrhythms and tribal melodies, allowing her to tell wild stories while exploring the avant-garde.',
    profilePicture: Angiko,
    soundCloud: {
      username: 'angi-ko',
      trackId: 2011929343,
    },
  },
  {
    slug: 'neoom',
    name: 'Neoom',
    description:
      'Neoom’s sound moves between Dark Progressive Psytrance, Psytechno, bushprog, and hypnotic technoid soundscapes, united by consistently darker atmospheres. This diverse approach blends psychedelic textures with modern synth work, creating deep, swampy but driving vibes that keep the dance floor moving.\n\n' +
      'Unbound by genre, the project moves fluidly between styles. The result is a distinctive sonic fingerprint where driving beats meet hypnotic patterns and evolving atmospheres.',
    profilePicture: Neoom,
    soundCloud: {
      username: 'neoom_vienna',
      trackId: 2012444291,
    },
  },
  {
    slug: 'stoik',
    name: 'STOIK',
    description:
      'As one of the most versatile producer/Djs around, STOIK can provide authentically minimalistic, magically playful and aggressively rough beats. What all his sets have in common though, is a combination of variety and continuity.\n\n' +
      'STOIKs diverse productions are mainly released on the Dutch label The Funky Cat.\n' +
      'As a DJ he has played many national and international gigs, looking back at no less than 10 years on stage.',
    profilePicture: Stoik,
    soundCloud: {
      username: 'iamstoik',
      trackId: 1493767765,
    },
  },
  {
    slug: 'fullgass',
    name: 'Fullgas',
    description:
      'Attendance mandatory for all Fullon lovers — see you there! ✌️',
    profilePicture: Fullgas,
    soundCloud: {
      username: 'fullgas_psy',
      trackId: 2068515188,
    },
  },
  {
    slug: 'mars-l',
    name: 'Mars L',
    description:
      '"It all started with the big bang."\n\n' +
      'With a focus on dark minimal textures and driving psytechno, Mars L crafts a steady, immersive atmosphere wherever he plays.',
    profilePicture: MarsL,
    soundCloud: {
      username: 'mars_l_aut',
      trackId: 2112409140,
    },
  },
  {
    slug: 'bonobros',
    name: 'Bonobros',
    description:
      'In the depth of the jungle, T and P united as the ultimate duo... the Bonobros.\n\n' +
      'As they mashed up, the beat of the heart and the trance of the soul merged into a wild tune that broke all the rules.\n\n' +
      'Now they entertain their primate counterparts in clubs and their show is guaranteed to be bananas.... Uhhh! 🙈🙉🙊',
    profilePicture: Bonobros,
    soundCloud: {
      username: 'bonobros-aut',
      trackId: 2046069608,
    },
  },
  {
    slug: 'remnant',
    name: 'Remnant',
    description:
      'Join the Techno Ritual with DJ Remnant: Hypnotic Beats, Dark Vibes, and Unforgettable Ceremonies!\n\n' +
      "Expect a unique blend of dark, brooding techno and ethereal soundscapes. Remnant's sets are carefully crafted journeys that take the listener on a ride through a universe of sound.\n\n" +
      "His deep, pulsing beats are designed to connect with the audience on a primal level, while his use of intricate melodies and haunting vocal samples creates an otherworldly atmosphere that's hard to resist.",
    profilePicture: Remnant,
    soundCloud: {
      username: 'djremnant',
      trackId: 1493243023,
    },
  },
] as const;
