import { Dict, DocAttach, Portfolio } from '@contact/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@sql-tools/nestjs-sequelize';
import SmbService from 'src/modules/smb/smb.service';

@Injectable()
export default class PortfolioService {
  constructor(
    @InjectModel(Portfolio, 'contact')
    private readonly modelPortfolio: typeof Portfolio,
    @InjectModel(DocAttach, 'contact')
    private readonly modelDocAttach: typeof DocAttach,
    @InjectModel(Dict, 'contact')
    private readonly modelDict: typeof Dict,
    private readonly smb_service: SmbService,
  ) {}

  async docAttach() {
    const docAttach = await this.modelDocAttach.findAll({
      attributes: [
        'obj_id',
        'r_id',
        'name',
        'filebody',
        'is_active',
        //'vers1',
        //'vers2',
        'r_user_id',
        'dt',
        'number',
        'FILE_SERVER_NAME',
        'REL_SERVER_PATH',
        'filename',
        'attach_typ',
      ],
      limit: 5,
      include: [
        {
          model: Dict,
        },
      ],
    });
    for (const doc of docAttach) {
      const rel = doc.REL_SERVER_PATH;
      const filename = doc.FILE_SERVER_NAME;
      const path = `${rel}\\${filename}`;
      const exists = await this.smb_service.exists(path);
      const obj = {
        doc_id: doc.id,
        path,
        exists,
      };
      console.log(obj);
    }
  }

  async ports() {
    try {
      return await this.modelPortfolio.findAll({
        limit: 100,
      });
    } catch (error) {
      return error;
    }
  }
}
