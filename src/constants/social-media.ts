import {
  getFacebookProfileUrl,
  getInstagramProfileUrl,
  getResidentAdvisorPromoterProfileUrl,
  getSoundCloudProfileUrl,
  getTelegramProfileUrl,
} from '@/utils/helper';

export const SOCIAL_MEDIA_ITEMS = [
  {
    label: 'Instagram',
    href: getInstagramProfileUrl('tohuwabohu.vienna'),
  },
  {
    label: 'Facebook',
    href: getFacebookProfileUrl('tohuwabohu.vienna'),
  },
  {
    label: 'SoundCloud',
    href: getSoundCloudProfileUrl('tohuwabohu-vienna'),
  },
  {
    label: 'Telegram',
    href: getTelegramProfileUrl('TohuwabohuVienna'),
  },
  {
    label: 'Resident Advisor',
    href: getResidentAdvisorPromoterProfileUrl('138321'),
  },
] as const;
