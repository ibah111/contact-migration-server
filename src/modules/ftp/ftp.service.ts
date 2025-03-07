import { Injectable } from '@nestjs/common';
import * as ftp from 'basic-ftp';
import { FtpInput, FtpProps } from './ftp.input';
import { ConfigService } from '@nestjs/config';
import { createReadStream } from 'fs';

@Injectable()
export default class FTPService {
  private client: ftp.Client;
  private ftpProps: FtpProps;

  constructor(private readonly config: ConfigService) {
    this.client = new ftp.Client();
    this.client.ftp.verbose = true; // Логирование (можно отключить)
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

  async uploadFile(buffer: Buffer, remoteFilePath: string) {
    try {
      const fileStream = createReadStream(buffer);
      await this.client
        .uploadFrom(fileStream, remoteFilePath)
        .then(() => console.log('File uploaded:'.green, remoteFilePath));
    } catch (error) {
      console.error('FTP Upload Error:'.red, error);
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

  async mkDir({ path }: FtpInput) {
    try {
      await this.client.ensureDir(path);
    } catch (error) {
      console.log('ensureDir error');
      throw Error(error);
    }
  }

  async close() {
    this.client.close();
    console.log('FTP Connection closed');
  }
}
