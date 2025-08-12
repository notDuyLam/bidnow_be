import { DataSource } from 'typeorm';
import 'dotenv/config';

const useUrl = Boolean(process.env.DATABASE_URL);

export default new DataSource({
  type: 'postgres',
  ...(useUrl
    ? { url: process.env.DATABASE_URL }
    : {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }),
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  synchronize: false,
  logging: false,
  entities: [__dirname + '/../entities/*.entity.{ts,js}', __dirname + '/../entities/*.{ts,js}'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
});


