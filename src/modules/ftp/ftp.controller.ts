import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import FTPService from './ftp.service';
import { ApiOperation } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { FtpInput } from './ftp.input';

@Controller('ftp')
export default class FtpController {
  constructor(
    private readonly ftpService: FTPService,
    private readonly config: ConfigService,
  ) {}

  @ApiOperation({
    summary: 'Список папок и файлов',
    description:
      'Возвращает список файлов исходя из переданного пути (по дефолту "/") ',
  })
  @Get('list')
  async list(@Query() { path = '/' }: FtpInput) {
    await this.ftpService.connect();
    const files = await this.ftpService.listFiles(path);
    await this.ftpService.close();
    return files;
  }

  @ApiOperation({
    summary: 'Создаёт папку и автоматически меняет путь на этот каталог',
    description:
      'Убедитесь, что указанный удаленный путь существует, создав все необходимые каталоги. Эта функция также изменяет текущий рабочий каталог на указанный путь. (translated by google)',
  })
  @Post('mkDir')
  async mkDir(@Body() { path }: FtpInput) {
    await this.ftpService.connect();
    await this.ftpService.mkDir({
      path,
    });
    await this.ftpService.close();
  }
}
