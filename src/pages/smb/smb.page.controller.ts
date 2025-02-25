import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import PortfolioService from './smb.page.service';
import { SMBPathInput } from './smb.input';

@ApiTags('smb_page')
@Controller('smb_page')
export default class SmbPageController {
  constructor(private readonly service: PortfolioService) {}

  @Post('readdir')
  async readdir(@Body() { path }: SMBPathInput) {
    return await this.service.readdir(path);
  }

  @Post('exists')
  async exists(@Body() { path }: SMBPathInput) {
    return await this.service.exists(path);
  }

  @Post('readFile')
  async readFile(@Body('path') { path }: SMBPathInput) {
    return await this.service.readFile(path);
  }
}
