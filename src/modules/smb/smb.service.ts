import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
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
    this.share = this.config.get<string>('share')!.replace(/\\\\/g, '\\'); // <=== Solved problem
    this.domain = this.config.get<string>('domain')!;
    this.username = this.config.get<string>('smb_username')!;
    this.password = this.config.get<string>('smb_password')!;
    const right_share = this.share === '\\\\newct.usb.ru\\Luxbase';
    const right_domain = this.domain === 'usb.ru';
    this.smb = new SMB2({
      share: '\\\\newct.usb.ru\\Luxbase',
      domain: 'usb.ru',
      username: this.username,
      password: this.password,
      port: 445,
    });
    console.log(
      this.share.blue,
      '\\\\newct.usb.ru\\Luxbase'.yellow,
      '\n',
      'right_share:',
      right_share ? 'Share correct'.green : 'Share wrong'.red,
      '\n',
      'right_domain:',
      right_domain ? 'Domain correct'.green : 'Domain wrong'.red,
    );
  }

  async exists(path: string) {
    return new Promise((resolve, reject) => {
      this.smb.exists(path, (err: any, exists: any) => {
        if (err) reject(err);
        resolve(exists);
      });
    });
  }

  async readdir(path: string) {
    return new Promise((resolve, reject) => {
      this.smb.readdir(`Docattach\\${path}`, (err: any, files: string[]) => {
        if (err) reject(err);
        resolve(files);
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
