import { Module } from '@nestjs/common';
import FTPService from './ftp.service';

@Module({
  providers: [FTPService],
  exports: [FTPService],
})
export default class FTPModule {}
