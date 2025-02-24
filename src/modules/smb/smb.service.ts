import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { node } from 'src/main';
const SMB2 = require('smb2');

@Injectable()
export default class SmbService {
  //smb2 type
  private smb: any;
  private share: string;
  private domain: string;
  private username: string;
  private password: string;
  constructor(private readonly config: ConfigService) {
    this.share = this.config.get<string>('share')!;
    this.domain = this.config.get<string>('domain')!;
    this.username = this.config.get<string>('smb_username')!;
    this.password = this.config.get<string>('smb_password')!;
    this.smb = new SMB2({
      share: '\\\\newct.usb.ru\\Luxbase\\',
      domain: 'usb.ru',
      username: 'Contact-SMB',
      password: 'Contact-SMB',
      port: 445,
    });
    console.log(
      'smb'.yellow,
      this.share,
      this.domain,
      this.username,
      this.password,
    );
  }

  //"\\newct\luxbase\Docattach\0\0DD92B61-6775-4B51-8233-3CE4BD6E4656..pdf"
  async exists(path: string) {
    console.log(path);
    return new Promise((resolve, reject) => {
      this.smb.exists(path, (err: any, exists: any) => {
        if (err) reject(err);
        resolve(exists);
      });
    });
  }

  async readdir(path: string) {
    node ?? console.log('readdir path'.yellow, path);
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
