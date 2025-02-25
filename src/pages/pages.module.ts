import { Module } from '@nestjs/common';
import { SmbPageModule } from './smb/smb.page.module';

@Module({
  imports: [SmbPageModule],
})
export default class PagesModule {}
