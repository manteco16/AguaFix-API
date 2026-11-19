import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReportPhotoUrls1792617301435 implements MigrationInterface {
    name = 'AddReportPhotoUrls1792617301435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WATER_REPORT" ADD "photoUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "WATER_REPORT" ADD "repairPhotoUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WATER_REPORT" DROP COLUMN "repairPhotoUrl"`);
        await queryRunner.query(`ALTER TABLE "WATER_REPORT" DROP COLUMN "photoUrl"`);
    }

}
