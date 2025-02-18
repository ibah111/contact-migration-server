import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import Models from '@contact/models';
import { Dialect } from 'sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      name: 'contact',
      useFactory(config: ConfigService) {
        return {
          dialect: 'mssql',
          
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export default class ContactDatabase {}
