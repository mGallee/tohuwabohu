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
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
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
            },
            {
              name: 'city',
              type: 'text',
              required: true,
            },
            {
              name: 'country',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'beforeMidnightPrice',
      type: 'number',
      required: true,
    },
    {
      name: 'lineup',
      type: 'array',
      fields: [
        {
          name: 'artist',
          type: 'text',
          required: true,
        },
        {
          name: 'startTime',
          type: 'text',
          required: true,
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
          relationTo: 'media',
          required: true,
          label: 'Front Flyer',
        },
        {
          name: 'back',
          type: 'upload',
          relationTo: 'media',
          label: 'Back Flyer',
        },
      ],
    },
  ],
};
