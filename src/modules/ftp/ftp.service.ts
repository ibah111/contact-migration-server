import { Injectable } from '@nestjs/common';
import * as ftp from 'basic-ftp';
import { FtpInput, FtpProps } from './ftp.input';
import { ConfigService } from '@nestjs/config';
import { createReadStream } from 'fs';
import { Readable } from 'stream';

@Injectable()
export default class FTPService {
  private client: ftp.Client;
  private ftpProps: FtpProps;
  private currentDir: string = '/';

  constructor(private readonly config: ConfigService) {
    this.client = new ftp.Client();
    this.client.ftp.verbose = false; // Логирование (можно отключить)
    this.ftpProps = {
      host: config.get<string>('ftp_host')!,
      user: config.get<string>('ftp_login')!,
      password: config.get<string>('ftp_password')!,
    };
  }

  async connect() {
    try {
      await this.client.access({
        ...this.ftpProps,
        secure: false, // Указать `true`, если требуется защищенное соединение
      });
      console.log('FTP Connected');
    } catch (error) {
      console.error('FTP Connection Error:'.red, error);
      throw error;
    }
  }

  async uploadFile(stream: NodeJS.ReadableStream, remoteFilePath: string) {
    try {
      const nodeStream = Readable.from(stream as any);
      return await this.client
        .uploadFrom(nodeStream, remoteFilePath)
        .then((res) => {
          console.log('FTP responce'.green, res);
          return res;
        });
    } catch (error) {
      console.error('FTP Upload Error:'.red, error);
      throw error;
    }
  }

  async uploadFileBuffer(data: Buffer, fullPath: string): Promise<void> {
    try {
      const stream = Readable.from(data);
      // const fullPath = `${this.currentDir}${remotePath}`;
      console.log('Uploading to FTP path:', fullPath);
      await this.client.uploadFrom(stream, fullPath);
      console.log('File uploaded successfully:'.green, fullPath);
    } catch (error) {
      console.error(`FTP Upload Error for ${fullPath}:`, error);
      throw error;
    }
  }

  async downloadFile(remoteFilePath: string, localFilePath: string) {
    try {
      await this.client.downloadTo(localFilePath, remoteFilePath);
      console.log('File downloaded:'.green, localFilePath);
    } catch (error) {
      console.error('FTP Download Error:'.red, error);
      throw error;
    }
  }

  async listFiles(remotePath: string) {
    try {
      const files = await this.client.list(remotePath);
      console.log('Files:', files);
      return files;
    } catch (error) {
      console.error('FTP List Error:'.red, error);
      throw error;
    }
  }

  fixPath(path: string): string {
    return path
      .replace(/[:",<>*?|]/g, '') // Удаляем запрещённые символы
      .replace(/\s+/g, '_') // Заменяем пробелы на подчёркивания
      .substring(0, 150); // Ограничиваем длину
  }

  async mkDir({ path }: FtpInput) {
    try {
      const folder_name = path
        .replace(/[:",<>*?|]/g, '') // Удаляем запрещённые символы
        .replace(/\s+/g, '_') // Заменяем пробелы на подчёркивания
        .substring(0, 150); // Ограничиваем длину
      console.log('Creating directory:', folder_name);
      await this.client.ensureDir(`/${folder_name}/`);
      this.currentDir = `/${folder_name}/`;
      console.log('Directory created and set as current');
    } catch (error) {
      console.log('ensureDir error');
      throw Error(error);
    }
  }

  async setCurrentDir(dir: string) {
    try {
      this.currentDir = dir;
      await this.client.cd(dir);
      console.log('Changed FTP directory to:', dir);
    } catch (error) {
      console.error('Error changing FTP directory:', error);
      throw error;
    }
  }

  async close() {
    this.client.close();
    console.log('FTP Connection closed');
  }
}
