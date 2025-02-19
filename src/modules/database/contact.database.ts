import Models from '@contact/models';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { Dialect } from 'sequelize';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      name: 'contact',
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          models: Models,
          dialect: 'mssql',
          port: 1433,
          host: config.get<string>('host'),
          database: config.get<string>('database'),
          password: config.get<string>('password'),
          username: config.get<string>('username'),
        };
      },
    }),
  ],
})
export default class ContactDatabase {}
