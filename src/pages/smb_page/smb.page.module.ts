import { Dict, DocAttach, Portfolio } from '@contact/models';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import SmbModule from 'src/modules/smb/smb.module';
import SmbPageController from './smb.page.controller';
import SmbPageService from './smb.page.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Portfolio, DocAttach, Dict], 'contact'),
    SmbModule,
  ],
  controllers: [SmbPageController],
  providers: [SmbPageService],
})
export class SmbPageModule {}
