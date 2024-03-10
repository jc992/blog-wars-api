import { typeOrmConfig } from './config';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource(typeOrmConfig.getFullTypeOrmConfig());

export default AppDataSource;
