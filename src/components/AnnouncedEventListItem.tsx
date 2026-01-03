import { HTMLAttributes } from 'react';
import { AnnouncedEvent } from '@/constants/event';
import Image from 'next/image';
import EventBackground from '@/assets/event-background.webp';
import { Clock10, MapPin } from 'lucide-react';

interface AnnouncedEventListItemProps extends HTMLAttributes<HTMLElement> {
  event: AnnouncedEvent;
}

export function AnnouncedEventListItem({
  event,
  className,
  ...rest
}: AnnouncedEventListItemProps) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-xl border-2 bg-black ${className}`}
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
      <article className="z-1 flex flex-col gap-2 p-4 md:gap-4">
        <div className="flex flex-col gap-1">
          <div className="animate-text-glow self-start rounded-full bg-stone-900 px-2 py-0.5 text-sm">
            Safe the date
          </div>
          <div className="font-healine text-2xl md:text-4xl">{event.title}</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-1">
            <Clock10 size={20} strokeWidth={2.2} />
            <time className="flex text-xl">
              {`${event.startDate.toLocaleString('de-AT', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })} - ${event.endDate.toLocaleString('de-AT', {
                hour: 'numeric',
                minute: 'numeric',
              })}`}
            </time>
          </div>
          <div className="flex flex-row items-center gap-1">
            <MapPin size={20} strokeWidth={2.2} />
            <address className="flex text-xl not-italic">
              {event.location}
            </address>
          </div>
        </div>
      </article>
    </div>
  );
}
