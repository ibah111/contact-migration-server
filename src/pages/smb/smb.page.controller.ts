import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import PortfolioService from './smb.page.service';
import { SMBPathInput } from './smb.input';

@ApiTags('SMB Page')
@Controller('smb')
export default class SmbPageController {
  constructor(private readonly service: PortfolioService) {}

  @ApiOperation({
    description: 'Чтение директории от папки Docattach',
  })
  @Post('readdir')
  async readdir(@Body() { path }: SMBPathInput) {
    return await this.service.readdir(path);
  }

  @ApiOperation({
    description: 'Проверка файла на существование',
  })
  @Post('exists')
  async exists(@Body() { path }: SMBPathInput) {
    return await this.service.exists(path);
  }

  @ApiOperation({
    description: 'Чтение файла. Возвращается buffer',
  })
  @Post('readFile')
  async readFile(@Body('path') { path }: SMBPathInput) {
    return await this.service.readFile(path);
  }
}
