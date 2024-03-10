import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';

config();

class TypeOrmConfiguration {
  public getFullTypeOrmConfig(): DataSourceOptions {
    return {
      ...this.getBaseTypeOrmConfig(),
      migrations: ['dist/migrations/**/*.js'],
    };
  }

  public getBaseTypeOrmConfig(): DataSourceOptions {
    return {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ['dist/**/*.entity.js'],
      migrationsTableName: 'custom_migration_table',
      ssl: !this.isDevEnvironment(),
      extra: !this.isDevEnvironment()
        ? {
            ssl: {
              rejectUnauthorized: false,
              ca: process.env.NODE_EXTRA_CA_CERTS,
            },
          }
        : {},
      synchronize: false,
      logging: true,
    };
  }

  private isDevEnvironment(): boolean {
    const env = process.env.POSTGRES_HOST;
    return env.includes('localhost') || env.includes('127.0.0.1');
  }
}

const typeOrmConfig = new TypeOrmConfiguration();

export { typeOrmConfig };
