import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SMB2 from '@marsaud/smb2-promise';

@Injectable()
export default class SmbService {
  //smb2 type
  private smb: SMB2;
  constructor(private readonly config: ConfigService) {
    this.smb = new SMB2({
      share: this.config.get<string>('share')!,
      domain: this.config.get<string>('domain')!,
      username: this.config.get<string>('smb_username')!,
      password: this.config.get<string>('smb_password')!,
    });
  }

  async exists(path: string) {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
}
