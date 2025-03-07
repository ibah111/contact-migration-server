import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import FTPService from './ftp.service';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { FtpInput } from './ftp.input';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
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
  @UseInterceptors(FileInterceptor('file', {}))
  async uploadFile(
    @Query() { path }: FtpInput,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }

    await this.ftpService.connect();
    const upload_path = `/${path}${file.filename}`;
    await this.ftpService.uploadFile(file.buffer, upload_path);
    await this.ftpService.close();

    return {
      message: 'File uploaded successfully',
      path: upload_path,
    };
  }
}
