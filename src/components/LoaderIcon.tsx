import { LoaderPinwheel, LucideProps } from 'lucide-react';
import { cn } from '@/utils/helper';

export default function LoaderIcon({ className, ...rest }: LucideProps) {
  return <LoaderPinwheel className={cn('animate-spin', className)} {...rest} />;
}
