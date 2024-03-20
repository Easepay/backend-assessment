import { DataSource } from 'typeorm';
import { join } from 'path';

export default new DataSource({
  type: 'sqlite',
  database: 'easepay.auth.db',
  entities: [join(__dirname, '../entities/**/{*.ts,*.js}')],
  migrations: [join(__dirname, '../migrations/{*.ts,*.js}')],
  // allow logging in development environment
  // logging: configService.get('NODE_ENV') === 'production' ? false : true,
  logging: true,
});
