import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const SMB2 = require('smb2');

@Injectable()
export default class SmbService {
  //smb2 type
  private smb: any;
  constructor(private readonly config: ConfigService) {
    this.smb = new SMB2({
      share: '\\\\newct.usb.ru\\Luxbase',
      domain: 'usb.ru',
      username: 'Contact-SMB',
      password: 'Contact-SMB',
      port: 445,
    });
  }

  async exists(path: string) {
    return new Promise((resolve, reject) => {
      console.log(this.smb);
      this.smb.readdir('\\', (err, files) => {
        if (err) reject(err);
        else console.log(files);
      });
    });
  }
}
