import { Migration } from '@mikro-orm/migrations';

export class Migration20210623195158 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "project" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "description" varchar(255) not null, "owner_id" int4 not null);');
    this.addSql('alter table "project" add constraint "project_pkey" primary key ("id");');

    this.addSql('alter table "project" add constraint "project_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');
  }

}
