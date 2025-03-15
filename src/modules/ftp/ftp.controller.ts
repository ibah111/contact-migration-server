import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UnsupportedMediaTypeException,
  UseInterceptors,
} from '@nestjs/common';
import FTPService from './ftp.service';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { FtpInput } from './ftp.input';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { FastifyRequest } from 'fastify';
import * as fs from 'fs';
import { promisify } from 'util';
import { pipeline } from 'stream';

const pump = promisify(pipeline);

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

  @Post('upload')
  @ApiOperation({ summary: 'Загрузка файла по ФТП' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(
    @Req() req: FastifyRequest,
    @Query() { path: remotePath }: FtpInput,
  ) {
    if (!req.isMultipart()) {
      throw new UnsupportedMediaTypeException('Request is not multipart');
    }

    const parts = await req.file();
    if (!parts) {
      throw new Error('No file uploaded');
    }

    // Подключаемся к FTP
    await this.ftpService.connect();

    // Загружаем файл напрямую через поток (без сохранения на диск)
    await this.ftpService.uploadFile(
      parts.file,
      `${remotePath}${parts.filename}`,
    );

    // Закрываем соединение с FTP
    await this.ftpService.close();

    return {
      message: 'File uploaded successfully',
      path: `${remotePath}${parts.filename}`,
    };
  }
}
