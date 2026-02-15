import { CollectionConfig } from 'payload';
import { getEventSlug } from '@/utils/helper';

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startDate', 'location.name'],
    listSearchableFields: ['title', 'description'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data && data.title && data.startDate && data.location) {
              return getEventSlug({
                title: data.title,
                startDate: new Date(data.startDate),
                location: data.location,
              });
            }
            return undefined;
          },
        ],
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 150,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          displayFormat: 'dd.MM.yyyy HH:mm',
          pickerAppearance: 'dayAndTime',
          timeFormat: 'HH:mm',
          overrides: {
            calendarStartDay: 1,
          },
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          displayFormat: 'dd.MM.yyyy HH:mm',
          pickerAppearance: 'dayAndTime',
          timeFormat: 'HH:mm',
          overrides: {
            calendarStartDay: 1,
          },
        },
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      max: 999,
      admin: {
        description: 'Entry price in euros (whole numbers only, no cents)',
        step: 1,
      },
      validate: (value: unknown) => {
        if (typeof value === 'number' && !Number.isInteger(value)) {
          return 'Price must be a whole number (no cents)';
        }
        return true;
      },
    },
    {
      name: 'beforeMidnightPrice',
      type: 'number',
      min: 0,
      max: 999,
      admin: {
        description:
          'Early entry price in euros (must be less than regular price)',
        step: 1,
      },
      validate: (value: unknown, { data }: { data?: { price?: number } }) => {
        if (typeof value === 'number' && !Number.isInteger(value)) {
          return 'Price must be a whole number (no cents)';
        }
        if (typeof value === 'number' && data?.price && value >= data.price) {
          return 'Before midnight price must be less than regular price';
        }
        return true;
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      maxLength: 2000,
      admin: {
        rows: 8,
      },
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          maxLength: 100,
          label: 'Venue Name',
        },
        {
          name: 'address',
          type: 'group',
          fields: [
            {
              name: 'street',
              type: 'text',
              required: true,
              maxLength: 150,
            },
            {
              name: 'city',
              type: 'text',
              required: true,
              maxLength: 100,
            },
            {
              name: 'country',
              type: 'text',
              required: true,
              maxLength: 100,
            },
          ],
        },
      ],
    },
    {
      name: 'lineup',
      type: 'array',
      fields: [
        {
          name: 'artist',
          type: 'text',
          required: true,
          maxLength: 100,
        },
        {
          name: 'startTime',
          type: 'text',
          required: true,
          minLength: 5,
          maxLength: 5,
          admin: {
            description: 'Format: HH:MM (e.g., 23:00)',
          },
          validate: (value: unknown) => {
            if (!value || typeof value !== 'string') {
              return true;
            }
            const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
            return (
              timeRegex.test(value) || 'Please use format HH:MM (e.g., 23:00)'
            );
          },
        },
      ],
    },
    {
      name: 'flyer',
      type: 'group',
      fields: [
        {
          name: 'front',
          type: 'upload',
          label: 'Front Flyer',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'back',
          type: 'upload',
          label: 'Back Flyer',
          relationTo: 'media',
        },
      ],
    },
  ],
};
