import Models from '@contact/models';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@sql-tools/nestjs-sequelize';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      name: 'contact',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        console.log(config);
        return {
          models: Models,
          dialect: 'mssql',
          port: config.get<number>('port'),
          host: config.get<string>('host'),
          database: config.get<string>('database'),
          password: config.get<string>('password'),
          username: config.get<string>('username'),
          logging: false,
        };
      },
    }),
  ],
})
export default class ContactDatabase {}
