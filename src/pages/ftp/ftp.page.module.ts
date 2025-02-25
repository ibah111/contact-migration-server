import { Module } from '@nestjs/common';
import FTPController from './ftp.page.controller';
import FTPService from 'src/modules/ftp/ftp.service';
import FTPModule from 'src/modules/ftp/ftp.module';

@Module({
  imports: [FTPModule],
  controllers: [FTPController],
  providers: [FTPService],
})
export default class FTPPageModule {}
