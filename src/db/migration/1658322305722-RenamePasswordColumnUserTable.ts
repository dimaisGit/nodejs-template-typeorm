import { MigrationInterface, QueryRunner } from "typeorm";

export class RenamePasswordColumnUserTable1658322305722 implements MigrationInterface {
    name = 'RenamePasswordColumnUserTable1658322305722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "encryptedPassword" TO "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "password" TO "encryptedPassword"`);
    }

}
