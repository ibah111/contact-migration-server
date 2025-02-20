import { Module } from '@nestjs/common';
import DatabaseModule from './database/database.modules';
import SmbModule from './smb/smb.module';
import FTPModule from './ftp/ftp.module';

@Module({
  imports: [DatabaseModule, SmbModule, FTPModule],
})
export default class ModulesModule {}
