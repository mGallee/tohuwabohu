export interface EventData {
  title: string;
  url: string;
  startDate: Date;
  endDate: Date;
  location: string;
  price: number;
  beforeMidnightPrice: number;
  lineup?: Array<string>;
}

export const EVENTS_DATA: EventData[] = [
  {
    title: 'Tohuwabohu - Psychedelic Edition',
    url: 'https://www.facebook.com/events/1140713441602380',
    startDate: new Date('2025/12/12 23:00'),
    endDate: new Date('2025/12/13 06:00'),
    location: 'Club Lucia, Vienna',
    price: 12,
    beforeMidnightPrice: 10,
  },
] as const;
