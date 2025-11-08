export type ArtistKey =
  | 'angiko'
  | 'neoom'
  | 'stoik'
  | 'fullgas'
  | 'bonobros'
  | 'remnant';

interface Artist {
  name: string;
  profilePicture: string;
  soundCloud: {
    username: string;
    trackId: number;
  };
}

export const ARTIST_MAP: Record<ArtistKey, Artist> = {
  angiko: {
    name: 'Angiko',
    profilePicture: 'angiko.jpg',
    soundCloud: {
      username: 'angi-ko',
      trackId: 2011929343,
    },
  },
  neoom: {
    name: 'Neoom',
    profilePicture: 'neoom.jpg',
    soundCloud: {
      username: 'neoom_vienna',
      trackId: 2012444291,
    },
  },
  stoik: {
    name: 'Stoik',
    profilePicture: 'stoik.jpg',
    soundCloud: {
      username: 'iamstoik',
      trackId: 1493767765,
    },
  },
  fullgas: {
    name: 'Fullgas',
    profilePicture: 'fullgas.jpg',
    soundCloud: {
      username: 'fullgas_psy',
      trackId: 2068515188,
    },
  },
  bonobros: {
    name: 'Bonobros',
    profilePicture: 'bonobros.jpg',
    soundCloud: {
      username: 'bonobros-aut',
      trackId: 2046069608,
    },
  },
  remnant: {
    name: 'Remnant',
    profilePicture: 'remnant.jpg',
    soundCloud: {
      username: 'djremnant',
      trackId: 1493243023,
    },
  },
} as const;
