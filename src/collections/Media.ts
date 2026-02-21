import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Image description',
      maxLength: 100,
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    crop: true,
    focalPoint: true,
    formatOptions: {
      format: 'webp',
      options: {
        quality: 85,
      },
    },
    resizeOptions: {
      width: 1440,
      withoutEnlargement: true,
    },
  },
};
