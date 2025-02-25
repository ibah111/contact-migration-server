import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client as FTPClient } from 'basic-ftp';

@Injectable()
export default class FTPService implements FTPServiceInterface {
  private ftp: FTPClient;
  private host: string;
  private user: string;
  private password: string;

  constructor(private readonly config: ConfigService) {
    this.host = this.config.get<string>('ftp_host')!;
    this.user = this.config.get<string>('ftp_user')!;
    this.password = this.config.get<string>('ftp_password')!;
  }
  async connect(): Promise<void> {
    console.log(this.ftp);
  }
  async disconnect(): Promise<void> {
    this.ftp.close();
    console.log('ftp disconnect');
  }
  // Загрузка файла на FTP
  async uploadFile(localPath: string, remotePath: string): Promise<void> {
    await this.ftp.uploadFrom(localPath, remotePath);
  }

  // Скачивание файла с FTP
  async downloadFile(remotePath: string, localPath: string): Promise<void> {
    await this.ftp.downloadTo(localPath, remotePath);
  }

  // Переименование файла на FTP
  async renameFile(oldPath: string, newPath: string): Promise<void> {
    await this.ftp.rename(oldPath, newPath);
  }

  // Удаление файла с FTP
  async deleteFile(remotePath: string): Promise<void> {
    await this.ftp.remove(remotePath);
  }

  // Создание директории на FTP
  async createDirectory(remotePath: string): Promise<void> {
    await this.ftp.ensureDir(remotePath);
  }

  // Удаление директории с FTP
  async removeDirectory(remotePath: string): Promise<void> {
    await this.ftp.removeDir(remotePath);
  }

  // Получение списка файлов в директории
  async listFiles(remotePath: string): Promise<string[]> {
    const list = await this.ftp.list(remotePath);
    return list.map((item) => item.name);
  }
}
