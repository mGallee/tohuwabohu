import { Event } from '@/constants/event';
import { HTMLAttributes } from 'react';
import { assertUnreachable } from '@/utils/helper';
import { AnnouncedEventListItem } from '@/components/AnnouncedEventListItem';
import { PublishedEventListItem } from '@/components/PublishedEventListItem';

interface EventListItemProps extends HTMLAttributes<HTMLAnchorElement> {
  event: Event;
}

export default function EventListItem({ event, ...rest }: EventListItemProps) {
  switch (event.type) {
    case 'announced':
      return <AnnouncedEventListItem event={event} {...rest} />;
    case 'published':
      return <PublishedEventListItem event={event} {...rest} />;
    default:
      assertUnreachable(event);
  }
}
