import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { Users } from '@/collections/Users';
import { Media } from '@/collections/Media';
import { Artists } from '@/collections/Artists';
import { Events } from '@/collections/Events';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Artists, Events],
  editor: lexicalEditor(),
  secret:
    process.env.PAYLOAD_SECRET ??
    (() => {
      throw new Error('PAYLOAD_SECRET environment variable is required!');
    })(),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URL ??
        (() => {
          throw new Error('DATABASE_URL environment variable is required!');
        })(),
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token:
        process.env.BLOB_READ_WRITE_TOKEN ??
        (() => {
          throw new Error(
            'BLOB_READ_WRITE_TOKEN environment variable is required!',
          );
        })(),
    }),
  ],
});
