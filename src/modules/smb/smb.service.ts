import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { node } from 'src/main';
import { Readable } from 'stream';
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
    return new Promise((resolve, reject) => {
      this.smb.exists(exists_path, (err: any, exists: any) => {
        if (err) {
          reject(err);
        }
        if (exists) {
          console.log(
            'exists_path'.yellow,
            exists_path,
            exists === true ? 'resolved'.green : 'not exists'.red,
          );
          resolve(exists);
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
      });
    });
  }

  createReadStream(path: string): Readable {
    return this.smb.createReadStream(`Docattach${path}`);
  }

  async readFile(
    path: string,
  ): Promise<{ data: Buffer | string; mimeType: string }> {
    const readFile_path = `Docattach${path}`;
    const extension = path.split('.').pop()?.toLowerCase() || '';
    console.log(readFile_path);
    return new Promise((resolve, reject) => {
      this.smb.readFile(readFile_path, (err, data) => {
        if (err) {
          return reject(new Error(`Failed to read file: ${err.message}`));
        }

        if (!data) {
          return reject(new Error('Empty file data received'));
        }

        try {
          const result = this.processFileData(data, extension);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  private getMimeType(extension: string): string {
    const mimeTypes: Record<string, string> = {
      pdf: 'application/pdf',
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      txt: 'text/plain',
    };
    return mimeTypes[extension] || 'application/octet-stream';
  }

  async readFileBuffer(
    path: string,
  ): Promise<{ data: Buffer; mimeType: string }> {
    const fullPath = `Docattach${path}`;
    const extension = path.split('.').pop()?.toLowerCase() || '';

    return new Promise((resolve, reject) => {
      this.smb.readFile(fullPath, (err, data) => {
        if (err) {
          reject(new Error(`Failed to read file: ${err.message}`));
          return;
        }

        if (!data) {
          reject(new Error('Empty file data received'));
          return;
        }

        try {
          const mimeType = this.getMimeType(extension);
          resolve({ data: Buffer.from(data), mimeType });
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  private processFileData(
    data: Buffer | undefined,
    extension: string,
  ): { data: Buffer | string; mimeType: string } {
    // Проверяем, что data существует
    if (!data) {
      throw new Error('Received undefined file data');
    }

    const mimeTypes: Record<string, string> = {
      txt: 'text/plain',
      pdf: 'application/pdf',
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      // добавьте другие MIME-типы по необходимости
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

  async disconnect() {
    if (this.smb) {
      this.smb.disconnect();
      console.log('SMB Connection closed');
    }
  }
}
