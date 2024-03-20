import { DatabaseTables } from 'config/database.table.names';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveCountryFromWaitlist1693304052127
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(DatabaseTables.PRODUCT_WAIT_LIST, 'country');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      DatabaseTables.PRODUCT_WAIT_LIST,
      new TableColumn({
        name: 'country',
        type: 'varchar',
      }),
    );
  }
}
