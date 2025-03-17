import { Module } from '@nestjs/common';
import DatabaseModule from './database/database.modules';
import SmbModule from './smb/smb.module';
import FTPModule from './ftp/ftp.module';
import PathModule from './path/path.module';

@Module({
  imports: [DatabaseModule, SmbModule, FTPModule, PathModule],
})
export default class ModulesModule {}
