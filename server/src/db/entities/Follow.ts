// /* eslint-disable import/no-unresolved */
// /* eslint-disable import/extensions */
// import {
//   Entity, Property, PrimaryKey,
// } from '@mikro-orm/core';
// import { Field, Int, ObjectType } from 'type-graphql';
// // import User from './User';

// @ObjectType()
// @Entity()
// export default class Follow {
//   @Field(() => Int)
//   @PrimaryKey()
//   id!: number;

//   // @Field(() => User)
//   // @ManyToMany(() => User, (user) => user.username)
//   // users = new Collection<User>(this);

//   @Field(() => String)
//   @Property({ type: 'date' })
//   createdAt = new Date();

//   @Field(() => String)
//   @Property({ type: 'date', onUpdate: () => new Date() })
//   updatedAt = new Date();
// }
