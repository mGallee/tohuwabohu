import Link from '@/components/Link';
import { EventData } from '@/constants/event';
import EventBackground from '../assets/event-background.webp';
import Image from 'next/image';

interface EventProps {
  event: EventData;
}

export default function Event({ event }: EventProps) {
  return (
    <Link
      className="relative flex flex-col overflow-hidden rounded-xl border-2 border-stone-50 bg-slate-900"
      href={event.url}
      target="_blank">
      <div className="absolute inset-0 z-0 opacity-50 brightness-50">
        <Image
          className="pointer-events-none object-cover object-center"
          src={EventBackground}
          alt="bg"
          fill
          placeholder="blur"
          draggable={false}
        />
      </div>
      <div className="z-10 flex flex-col gap-4 p-4 md:flex-row">
        <div className="flex flex-4 flex-col justify-between gap-2">
          <div className="flex flex-col">
            <div className="text-2xl md:text-4xl">{event.title}</div>
            <div className="text-xl">{`${event.startDate.toLocaleString(
              'de-AT',
              {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              },
            )} - ${event.endDate.toLocaleString('de-AT', {
              hour: 'numeric',
              minute: 'numeric',
            })}`}</div>
            <div className="text-xl text-stone-300">{event.location}</div>
          </div>
          <div className="flex flex-row gap-2">
            {event.lineup?.map((lineup) => (
              <div
                key={lineup}
                className="rounded-xl bg-slate-600 px-2.5 py-1.5 pt-0">
                {lineup}
              </div>
            ))}
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
      </div>
    </Link>
  );
}
