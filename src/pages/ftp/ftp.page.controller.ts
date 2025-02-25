import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import FTPService from 'src/modules/ftp/ftp.service';

@ApiTags('ftp')
@Controller('ftp')
export default class FTPController {
  constructor(private readonly service: FTPService) {}

  @Post('connect')
  async connect() {
    return await this.service.connect();
  }
}
