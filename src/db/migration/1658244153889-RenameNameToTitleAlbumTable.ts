import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameNameToTitleAlbumTable1658244153889 implements MigrationInterface {
    name = 'RenameNameToTitleAlbumTable1658244153889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" RENAME COLUMN "name" TO "title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" RENAME COLUMN "title" TO "name"`);
    }

}
