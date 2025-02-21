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
  //"\\newct\luxbase\Docattach\0\0DD92B61-6775-4B51-8233-3CE4BD6E4656..pdf"
  async exists(path: string) {
    const fullPath = `Docattach${path}`
      .replace('..', '.')
      .replace('\\\\', '\\');

    const myOwn = 'Docattach\\0\\0DD92B61-6775-4B51-8233-3CE4BD6E4656..pdf';
    return new Promise((resolve, reject) => {
      this.smb.exists(myOwn, (err: any, exists: any) => {
        if (err) reject(err);
        console.log('exists? = ', exists);
        resolve(exists);
      });
    });
  }

  async readdir() {
    return new Promise((resolve, reject) => {
      this.smb.readdir('Docattach\\', (err: any, files: string[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
          console.log(files);
        }
      });
    });
  }
}
