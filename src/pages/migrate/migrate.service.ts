import { Debt, DocAttach, LawAct, LawExec, Portfolio } from '@contact/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import DO_Types from 'src/modules/database/sqlite/sqlite.models/do_types.model';
import { MigrateInput } from './migrate.input';
import { Op } from 'sequelize';
import { node } from 'src/main';
import SmbService from 'src/modules/smb/smb.service';

@Injectable()
export default class MigrateService {
  constructor(
    @InjectModel(Portfolio, 'contact')
    private readonly modelPortfolio: typeof Portfolio,
    @InjectModel(Debt, 'contact')
    private readonly modelDebt: typeof Debt,
    @InjectModel(DocAttach, 'contact')
    private readonly modelDocAttach: typeof DocAttach,
    @InjectModel(DO_Types, 'sqlite')
    private readonly modelDoTypes: typeof DO_Types,
    private readonly smb_service: SmbService,
  ) {}

  async migrate({ r_portfolio_id, do_type_name, include_type }: MigrateInput) {
    console.log(
      'r_portfolio_id:',
      r_portfolio_id,
      '\n',
      'do_type_name:',
      do_type_name,
      '\n',
      'include_type:',
      include_type,
      '\n',
    );
    try {
      const obj = {
        1: {
          name: 'LawActs',
          model: LawAct,
        },
        2: {
          name: 'LawExecs',
          model: LawExec,
        },
      };
      const model_to_search = obj[include_type];

      const portfolio = await this.modelPortfolio.findOne({
        logging: node === 'dev' ? console.log : false,
        attributes: ['id', 'name'],
        rejectOnEmpty: new Error(`Портфель с id:"${r_portfolio_id}" не найден`),
        where: {
          id: r_portfolio_id,
        },
      });
      const debts = await this.modelDebt.findAll({
        where: {
          r_portfolio_id,
        },
        include: [
          {
            attributes: ['id'],
            model: model_to_search.model,
            required: true,
            include: [
              {
                model: DocAttach,
                required: true,
                attributes: [
                  'id',
                  'obj_id',
                  'r_id',
                  'name',
                  'filename',
                  'FILE_SERVER_NAME',
                  'REL_SERVER_PATH',
                ],
                where: {
                  name: {
                    [Op.like]: `${do_type_name}%`,
                  },
                },
              },
            ],
          },
        ],
      });
      const debts_obj = debts.map((item) => {
        const lawItems = item[model_to_search.name];

        const docAttachs = lawItems.flatMap(
          (lawItem) =>
            lawItem.DocAttachs?.map((doc) => ({
              id: doc.id,
              obj_id: doc.obj_id,
              r_id: doc.r_id,
              name: doc.name,
              filename: doc.filename,
              FILE_SERVER_NAME: doc.FILE_SERVER_NAME,
              REL_SERVER_PATH: doc.REL_SERVER_PATH,
            })) || [],
        );

        return {
          debt_id: item.id as number,
          doc_attachs: docAttachs,
        };
      });
      const results = [] as any[];
      const doc_attachs_objs = debts_obj.map((item) =>
        item.doc_attachs.map((item) => ({
          id: item.id,
          FILE_SERVER_NAME: item.FILE_SERVER_NAME,
          REL_SERVER_PATH: item.REL_SERVER_PATH,
          path: `${item.REL_SERVER_PATH.replace(/\\/g, '\\\\') + item.FILE_SERVER_NAME}`,
        })),
      );
      const files = debts_obj[1].doc_attachs;
      for (const { REL_SERVER_PATH, FILE_SERVER_NAME } of files) {
        try {
          const path = `${REL_SERVER_PATH.replace(/\\/g, '\\\\')}${FILE_SERVER_NAME}`;
          await new Promise((resolve) => setTimeout(resolve, 300));
          const exists = await this.smb_service.exists(path);
          results.push({ path, exists });
          console.log(`Checked: ${path} - ${exists ? 'Exists' : 'Not found'}`);
        } catch (error) {
          console.error(
            `Error checking file ${FILE_SERVER_NAME}:`,
            error.message,
          );
          results.push({
            path: `${REL_SERVER_PATH}${FILE_SERVER_NAME}`,
            error: error.message,
          });
        }
      }

      return {
        name: portfolio.name,
        type: do_type_name,
        model_to_search: model_to_search.name,
        debts_count: debts.length,
        doc_attachs_length: doc_attachs_objs.flat().length,
        results,
        doc_attachs_objs,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
