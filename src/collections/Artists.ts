import type { CollectionConfig } from 'payload';
import { ValidationError } from 'payload';
import { getArtistSlug } from '@/utils/helper';

export const Artists: CollectionConfig = {
  slug: 'artists',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'soundCloud.username', 'soundCloud.trackId'],
    listSearchableFields: ['name', 'description'],
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
            if (data?.name) {
              return getArtistSlug({ name: data.name });
            }
            return undefined;
          },
        ],
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'profilePicture',
      type: 'upload',
      relationTo: 'media',
      required: true,
      hasMany: false,
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'soundCloud',
      type: 'group',
      fields: [
        {
          name: 'username',
          type: 'text',
          required: true,
        },
        {
          name: 'trackId',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'instagram',
      type: 'group',
      fields: [
        {
          name: 'username',
          type: 'text',
        },
      ],
    },
    {
      name: 'residentAdvisor',
      type: 'group',
      fields: [
        {
          name: 'username',
          type: 'text',
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ req, data }) => {
        if (data.profilePicture) {
          const mediaId =
            typeof data.profilePicture === 'object'
              ? (data.profilePicture as { id: string }).id
              : data.profilePicture;

          if (mediaId) {
            try {
              const media = await req.payload.findByID({
                collection: 'media',
                id: mediaId,
                depth: 0,
              });

              if (!media) {
                throw new ValidationError({
                  errors: [
                    {
                      path: 'profilePicture',
                      message: 'Associated media not found',
                    },
                  ],
                });
              }

              const { width, height } = media;

              if (!width || !height) {
                throw new ValidationError({
                  errors: [
                    {
                      path: 'profilePicture',
                      message:
                        'Profile picture dimensions could not be determined. Please ensure the file is a valid image.',
                    },
                  ],
                });
              }

              if (width < 500 || height < 500) {
                throw new ValidationError({
                  errors: [
                    {
                      path: 'profilePicture',
                      message: `Image is too small (${width}x${height}). Minimum required: 500x500px.`,
                    },
                  ],
                });
              }

              if (width !== height) {
                throw new ValidationError({
                  errors: [
                    {
                      path: 'profilePicture',
                      message: 'Image must be aspect ratio 1:1!',
                    },
                  ],
                });
              }
            } catch (err) {
              if (err instanceof ValidationError) {
                throw err;
              }
              req.payload.logger.error(err);
              throw new ValidationError({
                errors: [
                  {
                    path: 'profilePicture',
                    message: 'An error occurred during image validation.',
                  },
                ],
              });
            }
          }
        }

        return data;
      },
    ],
  },
};
