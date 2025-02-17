import { Module } from '@nestjs/common';
import DatabaseModule from './database/database.modules';

@Module({
  imports: [DatabaseModule],
})
export default class ModulesModule {}
