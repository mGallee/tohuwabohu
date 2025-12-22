export interface EventData {
  title: string;
  url: string;
  startDate: Date;
  endDate: Date;
  location: string;
  price: number;
  beforeMidnightPrice: number;
}

export const EVENTS_DATA: EventData[] = [
  {
    title: 'Tohuwabohu - Psychedelic Edition',
    url: 'https://www.facebook.com/events/594969296486680',
    startDate: new Date('2025/02/22 22:00'),
    endDate: new Date('2025/02/23 06:00'),
    location: 'Flucc Deck, Vienna',
    price: 12,
    beforeMidnightPrice: 10,
  },
  {
    title: 'Tohuwabohu - Technoid Edition',
    url: 'https://www.facebook.com/events/1142069520991474',
    startDate: new Date('2025/4/19 22:30'),
    endDate: new Date('2025/4/20 06:00'),
    location: 'Flucc Deck, Vienna',
    price: 12,
    beforeMidnightPrice: 10,
  },
  {
    title: 'Tohuwabohu - Technoid Edition',
    url: 'https://www.facebook.com/events/1341430647982443',
    startDate: new Date('2025/9/6 23:00'),
    endDate: new Date('2025/9/7 06:00'),
    location: 'Flucc Deck, Vienna',
    price: 12,
    beforeMidnightPrice: 10,
  },
  {
    title: 'Tohuwabohu - Technoid Edition',
    url: 'https://www.facebook.com/events/1211001474178872',
    startDate: new Date('2025/12/12 23:00'),
    endDate: new Date('2025/12/13 06:00'),
    location: 'Club Lucia, Vienna',
    price: 12,
    beforeMidnightPrice: 10,
  },
] as const;
