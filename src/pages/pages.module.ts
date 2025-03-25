import { Module } from '@nestjs/common';
import { SmbPageModule } from './smb/smb.page.module';
import DO_TypesModule from './do_types/do_types.module';

@Module({
  imports: [SmbPageModule, DO_TypesModule],
})
export default class PagesModule {}
