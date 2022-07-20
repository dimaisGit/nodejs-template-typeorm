import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuthTokenTable1658328294186 implements MigrationInterface {
    name = 'CreateAuthTokenTable1658328294186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth_token" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_4572ff5d1264c4a523f01aa86a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auth_token" ADD CONSTRAINT "FK_5a326267f11b44c0d62526bc718" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth_token" DROP CONSTRAINT "FK_5a326267f11b44c0d62526bc718"`);
        await queryRunner.query(`DROP TABLE "auth_token"`);
    }

}
