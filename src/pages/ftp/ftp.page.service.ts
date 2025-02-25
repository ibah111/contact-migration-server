import { Injectable } from '@nestjs/common';
import FTPService from 'src/modules/ftp/ftp.service';

@Injectable()
export default class FTPPageService {
  constructor(private readonly ftpService: FTPService) {}

  async connect() {
    return await this.ftpService.connect();
  }
}
