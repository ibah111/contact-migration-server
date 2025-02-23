import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const SMB2 = require('smb2');

@Injectable()
export default class SmbService {
  //smb2 type
  private smb: any;
  constructor(private readonly config: ConfigService) {
    this.smb = new SMB2({
      share: config.get<string>('share'), // '\\\\newct.usb.ru\\Luxbase',
      domain: config.get<string>('domain'), // 'usb.ru',
      username: config.get<string>('smb_username'),
      password: config.get<string>('smb_password'),
      port: 445,
    });
  }

  //"\\newct\luxbase\Docattach\0\0DD92B61-6775-4B51-8233-3CE4BD6E4656..pdf"
  async exists(path: string) {
    return new Promise((resolve, reject) => {
      this.smb.exists(path, (err: any, exists: any) => {
        if (err) reject(err);
        console.log('exists? = ', exists);
        resolve(exists);
      });
    });
  }

  async readdir(path: string) {
    return new Promise((resolve, reject) => {
      this.smb.readdir(`Docattach\\${path}`, (err: any, files: string[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
          console.log(files);
        }
      });
    });
  }

  async readFile(path: string) {
    return new Promise<void>((resolve, reject) => {
      this.smb.readFile(path, (err, data) => {
        if (err) reject(err);
        console.log(data);
        resolve(data);
      });
    });
  }
}
