import { Module } from '@nestjs/common';
import ContactDatabase from './contact.database';

@Module({
  imports: [ContactDatabase],
})
export default class DatabaseModule {}
