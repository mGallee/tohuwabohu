import Link from '@/components/Link';
import { EventData } from '@/constants/event';
import EventBackground from '../assets/event-background.webp';
import Image from 'next/image';
import { Clock10, MapPin } from 'lucide-react';

interface EventProps {
  event: EventData;
}

export default function Event({ event }: EventProps) {
  return (
    <Link
      className="relative flex flex-col overflow-hidden rounded-xl border-2 border-stone-50 bg-slate-900"
      href={event.url}
      target="_blank">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-50 brightness-50">
        <Image
          className="pointer-events-none object-cover object-center"
          src={EventBackground}
          alt={`Event background for ${event.title}`}
          fill
          placeholder="blur"
          draggable={false}
        />
      </div>
      <article className="z-10 flex flex-col gap-4 p-4 md:flex-row">
        <div className="flex flex-4 flex-col justify-between gap-2">
          <div className="flex flex-col md:gap-1">
            <h3 className="text-2xl md:text-4xl">{event.title}</h3>
            <div className="flex flex-row items-center gap-1">
              <Clock10 className="mt-1.5" size={20} strokeWidth={2.2} />
              <time className="flex text-xl">
                {`${event.startDate.toLocaleString('de-AT', {
                  year: 'numeric',
                  month: 'short',
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
              <MapPin className="mt-1.5" size={20} strokeWidth={2.2} />
              <address className="flex text-xl not-italic">
                {event.location}
              </address>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between md:items-end">
          <div className="flex flex-col md:items-end">
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
          <hr className="mt-3 mb-0.5 flex w-2/6 md:w-3/4" />
          <div className="flex flex-col text-stone-300 md:items-end">
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
