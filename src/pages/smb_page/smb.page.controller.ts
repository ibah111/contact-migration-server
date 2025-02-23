import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import PortfolioService from './smb.page.service';

@ApiTags('smb_page')
@Controller('smb_page')
export default class SmbPageController {
  constructor(private readonly service: PortfolioService) {}

  @Get('readdir')
  async prots(@Query('path') path: string) {
    return await this.service.readdir(path);
  }

  @Get('exists')
  async exists(@Query('path') path: string) {
    return await this.service.exists(path);
  }

  @Get('readFile')
  async readFile(@Query('path') path: string) {
    return await this.service.readFile(path);
  }
}
