/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { MikroORM } from '@mikro-orm/core';
import path from 'path';
import Follow from './entities/Follow';
import Post from './entities/Post';
import { Project } from './entities/Project';
import Tag from './entities/Tag';
import User from './entities/User';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    disableForeignKeys: false, // wrap statements with `set foreign_key_checks = 0` or equivalent
    dropTables: true,
  },
  entities: [Post, User, Follow, Tag, Project],
  dbName: 'plexus',
  user: 'postgres',
  password: 'postgres',
  type: 'postgresql',
  debug: process.env.NODE_ENV !== 'production', // shows sql
} as Parameters<typeof MikroORM.init>[0];
