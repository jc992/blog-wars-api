import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1710093268803 implements MigrationInterface {
  name = 'NewMigration1710093268803';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "userId" integer NOT NULL, "blogPostId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c0354a9a009d3bb45a08655ce3" ON "comment" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ef03d5e0e2de13a5d99aa74b3c" ON "comment" ("blogPostId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "blog_post" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_694e842ad1c2b33f5939de6fede" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0eb9427b0d57b61dec38b66127" ON "blog_post" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "hash" character varying NOT NULL, "salt" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username") `,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_ef03d5e0e2de13a5d99aa74b3c7" FOREIGN KEY ("blogPostId") REFERENCES "blog_post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog_post" ADD CONSTRAINT "FK_0eb9427b0d57b61dec38b661277" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blog_post" DROP CONSTRAINT "FK_0eb9427b0d57b61dec38b661277"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_ef03d5e0e2de13a5d99aa74b3c7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_78a916df40e02a9deb1c4b75ed"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0eb9427b0d57b61dec38b66127"`,
    );
    await queryRunner.query(`DROP TABLE "blog_post"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ef03d5e0e2de13a5d99aa74b3c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c0354a9a009d3bb45a08655ce3"`,
    );
    await queryRunner.query(`DROP TABLE "comment"`);
  }
}
