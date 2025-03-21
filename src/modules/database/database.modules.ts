import { Module } from '@nestjs/common';
import ContactDatabase from './contact.database';
import SqliteDatabaseModule from './sqlite/sqlite.database.module';

@Module({
  imports: [ContactDatabase, SqliteDatabaseModule],
})
export default class DatabaseModule {}
