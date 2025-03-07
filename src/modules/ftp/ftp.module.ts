import { Module } from '@nestjs/common';
import FTPService from './ftp.service';
import FtpController from './ftp.controller';

@Module({
  controllers: [FtpController],
  providers: [FTPService],
  exports: [FTPService],
})
export default class FTPModule {}
