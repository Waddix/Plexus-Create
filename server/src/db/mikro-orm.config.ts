import { MikroORM } from '@mikro-orm/core';
import path from 'path';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    disableForeignKeys: false, // causes set_session_replicate error
  },
  entities: [],
  dbName: 'plexus',
  user: 'postgres',
  password: 'postgres',
  type: 'postgresql',
  debug: process.env.NODE_ENV !== 'production', // shows sql
} as Parameters<typeof MikroORM.init>[0];
