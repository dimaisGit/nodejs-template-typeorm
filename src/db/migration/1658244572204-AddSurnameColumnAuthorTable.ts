import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSurnameColumnAuthorTable1658244572204 implements MigrationInterface {
    name = 'AddSurnameColumnAuthorTable1658244572204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "author" ADD "surname" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "author" DROP COLUMN "surname"`);
    }

}
