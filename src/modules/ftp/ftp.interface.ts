interface FTPServiceInterface {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  uploadFile(localPath: string, remotePath: string): Promise<void>;
  downloadFile(remotePath: string, localPath: string): Promise<void>;
  renameFile(oldPath: string, newPath: string): Promise<void>;
  deleteFile(remotePath: string): Promise<void>;
  createDirectory(remotePath: string): Promise<void>;
  removeDirectory(remotePath: string): Promise<void>;
  listFiles(remotePath: string): Promise<string[]>;
}
