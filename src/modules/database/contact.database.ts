import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import Models from '@contact/models';
import { Dialect } from 'sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      host: process.env.host,
      dialect: process.env.dialect as Dialect,
      username: process.env.username,
      password: process.env.password,
      database: process.env.database,
      name: process.env.name,
      //@ts-ignore
      models: Models,
      logging: false,
    }),
  ],
})
export default class ContactDatabase {}
