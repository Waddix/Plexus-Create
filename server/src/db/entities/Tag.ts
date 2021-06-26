// /* eslint-disable import/extensions */
// /* eslint-disable import/no-unresolved */
// import { Field, ObjectType } from 'type-graphql';
// import { Column, Entity, ManyToOne } from 'typeorm';
// import { Base } from './Base';
// import {Post} from './Post';

// @ObjectType()
// @Entity()
// export class Tag extends Base {
//   @Field(() => String)
//   @Column({ type: 'text' })
//   name!: string;

//   @Field(() => [Post])
//   @ManyToOne(() => Post, (p: Post) => p.tags)
//   posts = Post[];

// }

export {}
