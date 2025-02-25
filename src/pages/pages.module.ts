import { Module } from '@nestjs/common';
import { SmbPageModule } from './smb/smb.page.module';
import FTPPageModule from './ftp/ftp.page.module';

@Module({
  imports: [SmbPageModule, FTPPageModule],
})
export default class PagesModule {}
