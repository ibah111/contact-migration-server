import { Dict, DocAttach, Portfolio } from '@contact/models';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import PortfolioController from './smb.page.controller';
import PortfolioService from './smb.page.service';
import SmbModule from 'src/modules/smb/smb.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Portfolio, DocAttach, Dict], 'contact'),
    SmbModule,
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class SmbPageModule {}
