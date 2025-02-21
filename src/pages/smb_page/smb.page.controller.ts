import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import PortfolioService from './smb.page.service';

@ApiTags('smb_page')
@Controller('smb_page')
export default class SmbPageController {
  constructor(private readonly service: PortfolioService) {}

  @Get('all')
  async prots() {
    return await this.service.ports();
  }

  @Get('exists')
  async exists() {
    return await this.service.exists();
  }

  @Get('readdir')
  async readdir() {
    return await this.service.readdir();
  }
}
