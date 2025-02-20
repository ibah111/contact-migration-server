declare module '@marsaud/smb2-promise' {
  class SMB2 {
    constructor(options: {
      share: string;
      domain?: string;
      username: string;
      password: string;
    });

    readdir(path: string): Promise<string[]>;
    readFile(filePath: string): Promise<Buffer>;
    writeFile(filePath: string, data: Buffer | string): Promise<void>;
  }

  export = SMB2;
}
