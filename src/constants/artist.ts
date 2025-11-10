export interface ArtistData {
  name: string;
  profilePicture: string;
  soundCloud: {
    username: string;
    trackId: number;
  };
}

export const ARTISTS_DATA: ArtistData[] = [
  {
    name: 'Angiko',
    profilePicture: 'angiko.jpg',
    soundCloud: {
      username: 'angi-ko',
      trackId: 2011929343,
    },
  },
  {
    name: 'Neoom',
    profilePicture: 'neoom.jpg',
    soundCloud: {
      username: 'neoom_vienna',
      trackId: 2012444291,
    },
  },
  {
    name: 'Stoik',
    profilePicture: 'stoik.jpg',
    soundCloud: {
      username: 'iamstoik',
      trackId: 1493767765,
    },
  },
  {
    name: 'Fullgas',
    profilePicture: 'fullgas.jpg',
    soundCloud: {
      username: 'fullgas_psy',
      trackId: 2068515188,
    },
  },
  {
    name: 'Bonobros',
    profilePicture: 'bonobros.jpg',
    soundCloud: {
      username: 'bonobros-aut',
      trackId: 2046069608,
    },
  },
  {
    name: 'Remnant',
    profilePicture: 'remnant.jpg',
    soundCloud: {
      username: 'djremnant',
      trackId: 1493243023,
    },
  },
] as const;
