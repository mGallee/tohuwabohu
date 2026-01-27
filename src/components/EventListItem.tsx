import { Event } from '@/payload-types';
import { HTMLAttributes } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EventBackground from '@/assets/event-background.webp';
import { Clock10, MapPin } from 'lucide-react';

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
      className={`hover:animate-box-glow active:animate-box-glow relative flex flex-col overflow-hidden rounded-xl border-2 bg-black ${className ?? ''}`}
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
      <article className="z-1 flex flex-col gap-4 p-4 md:flex-row">
        <div className="flex flex-4 flex-col gap-2 md:gap-4">
          <div className="font-healine text-2xl md:text-4xl">{event.title}</div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center gap-1">
              <Clock10 size={24} />
              <time className="flex text-xl">
                {`${new Date(event.startDate).toLocaleString('de-AT', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })} - ${new Date(event.endDate).toLocaleString('de-AT', {
                  hour: 'numeric',
                  minute: 'numeric',
                })}`}
              </time>
            </div>
            <div className="flex flex-row items-center gap-1">
              <MapPin size={24} />
              <address className="flex text-xl not-italic">
                {`${event.location.name}, ${event.location.address.city}`}
              </address>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-2 md:items-end">
          <div className="flex flex-col gap-1 md:items-end">
            <div className="text-xl">Entry price</div>
            <div className="text-2xl md:text-4xl">
              {event.price
                .toLocaleString('de-AT', {
                  style: 'currency',
                  minimumFractionDigits: 0,
                  currency: 'EUR',
                })
                .replace(/\u00A0/g, ' ')}
            </div>
          </div>
          <hr className="flex w-2/6 md:w-3/4" />
          <div className="flex flex-col gap-1 text-stone-300 md:items-end">
            <div className="text-lg">Before midnight</div>
            <div className="text-xl md:text-2xl">
              {event.beforeMidnightPrice
                .toLocaleString('de-AT', {
                  style: 'currency',
                  minimumFractionDigits: 0,
                  currency: 'EUR',
                })
                .replace(/\u00A0/g, ' ')}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
