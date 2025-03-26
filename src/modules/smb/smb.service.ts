import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { node } from 'src/main';
const SMB2 = require('@marsaud/smb2');

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
    const exists_path = `Docattach${path}`;
    console.log(exists_path.yellow);
    return new Promise((resolve, reject) => {
      this.smb.exists(exists_path, (err: any, exists: any) => {
        if (err) {
          reject(err);
          this.smb.disconnect();
        }
        if (exists) {
          console.log(
            'exists_path'.yellow,
            exists_path,
            exists === true ? 'resolved'.green : 'not exists'.red,
          );
          resolve(exists);
          this.smb.disconnect();
        }
      });
    });
  }

  async readdir(path: string) {
    const readdir_path = `Docattach${path}`;
    return new Promise((resolve, reject) => {
      this.smb.readdir(readdir_path, (err: any, files: string[]) => {
        if (err) reject(err);
        resolve(files);
        this.smb.disconnect();
      });
    });
  }

  async readFile(path: string) {
    const readFile_path = `Docattach${path}`;
    const extension = path.split('.').pop()?.toLowerCase() || '';
    return new Promise((resolve, reject) => {
      this.smb.readFile(readFile_path, (err, data) => {
        if (err) reject(err);
        const result = this.processFileData(data, extension);
        console.log('readFile result: ', result);
        resolve(result);
        this.smb.disconnect();
      });
    });
  }

  private processFileData(
    data: Buffer,
    extension: string,
  ): { data: Buffer | string; mimeType: string } {
    const mimeTypes: Record<string, string> = {
      txt: 'text/plain',
      pdf: 'application/pdf',
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    };

    const mimeType = mimeTypes[extension] || 'application/octet-stream';

    // Для текстовых файлов возвращаем строку
    if (mimeType.startsWith('text/') || ['pdf'].includes(extension)) {
      return {
        data: data.toString('utf-8'),
        mimeType,
      };
    }

    // Для бинарных файлов возвращаем Buffer
    return {
      data,
      mimeType,
    };
  }
}
