import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import SmbService from './smb.service';

@Module({
  imports: [ConfigModule],
  providers: [SmbService],
  exports: [SmbService],
})
export default class SmbModule {}
