/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { MikroORM } from '@mikro-orm/core';
import path from 'path';
import Follow from './entities/Follow';
import Post from './entities/Post';
import Tag from './entities/Tag';
import User from './entities/User';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    disableForeignKeys: false, // causes set_session_replicate error
  },
  entities: [Post, User, Follow, Tag],
  dbName: 'plexus',
  user: 'postgres',
  password: 'postgres',
  type: 'postgresql',
  debug: process.env.NODE_ENV !== 'production', // shows sql
} as Parameters<typeof MikroORM.init>[0];
