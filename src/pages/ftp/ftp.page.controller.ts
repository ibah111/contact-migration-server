import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ftp')
@Controller('ftp')
export default class FTPController {}
