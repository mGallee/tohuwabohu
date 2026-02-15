import * as migration_20260128_193407_initial_schema from './20260128_193407_initial_schema';
import * as migration_20260215_161650_before_midnight_price_optional from './20260215_161650_before_midnight_price_optional';

export const migrations = [
  {
    up: migration_20260128_193407_initial_schema.up,
    down: migration_20260128_193407_initial_schema.down,
    name: '20260128_193407_initial_schema',
  },
  {
    up: migration_20260215_161650_before_midnight_price_optional.up,
    down: migration_20260215_161650_before_midnight_price_optional.down,
    name: '20260215_161650_before_midnight_price_optional',
  },
];
