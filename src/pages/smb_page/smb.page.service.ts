import { Dict, DocAttach, Portfolio } from '@contact/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@sql-tools/nestjs-sequelize';
import SmbService from 'src/modules/smb/smb.service';

@Injectable()
export default class SmbPageService {
  constructor(
    @InjectModel(Portfolio, 'contact')
    private readonly modelPortfolio: typeof Portfolio,
    @InjectModel(DocAttach, 'contact')
    private readonly modelDocAttach: typeof DocAttach,
    @InjectModel(Dict, 'contact')
    private readonly modelDict: typeof Dict,
    private readonly smb_service: SmbService,
  ) {}

  async docAttachPath(id: number) {
    const doc = await this.modelDocAttach.findOne({
      where: {
        id,
      },
      rejectOnEmpty: true,
      attributes: [
        'id',
        'obj_id',
        'r_id',
        'name',
        'filebody',
        'is_active',
        'r_user_id',
        'dt',
        'number',
        'FILE_SERVER_NAME',
        'REL_SERVER_PATH',
        'filename',
        'attach_typ',
      ],
      limit: 1,
      include: [
        {
          model: Dict,
        },
      ],
    });
    const rel = doc.REL_SERVER_PATH;
    const filename = doc.FILE_SERVER_NAME;
    return {
      id,
      rel,
      filename,
    };
  }

  async readdir(path: string) {
    return await this.smb_service.readdir(path);
  }

  async exists(path: string) {
    return await this.smb_service.exists(path);
  }

  async readFile(path: string) {
    return await this.smb_service.readFile(path);
  }
}
