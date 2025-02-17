import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  dialect: process.env.DB_DIALECT as any,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT!, 10) || 1433,
}));
