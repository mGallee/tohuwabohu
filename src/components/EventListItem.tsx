import { Event } from '@/payload-types';
import { HTMLAttributes } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EventBackground from '@/assets/event-background.webp';
import { Clock10, MapPin, Ticket, TicketPercent } from 'lucide-react';
import { cn } from '@/utils/helper';

interface EventListItemProps extends HTMLAttributes<HTMLAnchorElement> {
  event: Event;
}

export default function EventListItem({
  event,
  className,
  ...rest
}: EventListItemProps) {
  return (
    <Link
      className={cn(
        'hover:animate-box-glow active:animate-box-glow relative flex flex-col overflow-hidden rounded-xl border-2 bg-black',
        className,
      )}
      href={`/events/${event.slug}`}
      {...rest}>
      <div className="absolute inset-0 z-0 opacity-50 brightness-50">
        <Image
          className="object-cover object-center"
          src={EventBackground}
          alt={`Event background for ${event.title}`}
          fill
          placeholder="blur"
          draggable={false}
        />
      </div>
      <article className="z-1 flex flex-col gap-2 p-2 md:gap-4 md:p-4">
        <div className="font-headline text-2xl md:text-4xl">{event.title}</div>
        <div className="flex flex-col gap-2 text-xl">
          <div className="flex flex-row gap-2">
            <Clock10 size={28} />
            <time className="flex">
              {`${new Date(event.startDate).toLocaleString('de-AT', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZone: 'Europe/Vienna',
              })} - ${new Date(event.endDate).toLocaleString('de-AT', {
                hour: 'numeric',
                minute: 'numeric',
                timeZone: 'Europe/Vienna',
              })}`}
            </time>
          </div>
          <div className="flex flex-row gap-2">
            <MapPin size={28} />
            <address className="flex not-italic">
              {`${event.location.name}, ${event.location.address.city}`}
            </address>
          </div>
          <div className="flex flex-row gap-2">
            <Ticket size={28} />
            <div className="flex">
              {event.price > 0 ? `Entry fee: ${event.price}€` : 'Free entry'}
            </div>
          </div>
          {typeof event.beforeMidnightPrice === 'number' ? (
            <div className="flex flex-row gap-2">
              <TicketPercent size={28} />
              <div className="flex">
                {event.beforeMidnightPrice > 0
                  ? `Entry fee before midnight: ${event.beforeMidnightPrice}€`
                  : 'Free entry'}
              </div>
            </div>
          ) : null}
        </div>
      </article>
    </Link>
  );
}
