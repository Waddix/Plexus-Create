import { Migration } from '@mikro-orm/migrations';

export class Migration20210622172848 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tag" ("id" serial primary key, "name" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('create table "follow" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('create table "user" ("id" serial primary key, "username" text not null, "password" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');

    this.addSql('create table "post" ("id" serial primary key, "text" text not null, "type" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('create table "post_tags" ("post_id" int4 not null, "tag_id" int4 not null);');
    this.addSql('alter table "post_tags" add constraint "post_tags_pkey" primary key ("post_id", "tag_id");');

    this.addSql('alter table "post_tags" add constraint "post_tags_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "post_tags" add constraint "post_tags_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade on delete cascade;');
  }

}
