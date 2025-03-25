import { Debt, DocAttach, LawAct, LawExec, Portfolio } from '@contact/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import DO_Types from 'src/modules/database/sqlite/sqlite.models/do_types.model';
import { MigrateInput } from './migrate.input';
import { Op } from 'sequelize';

@Injectable()
export default class MigrateService {
  constructor(
    @InjectModel(Portfolio, 'contact')
    private readonly modelPortfolio: typeof Portfolio,
    @InjectModel(DocAttach, 'contact')
    private readonly modelDocAttach: typeof DocAttach,
    @InjectModel(DO_Types, 'sqlite')
    private readonly modelDoTypes: typeof DO_Types,
  ) {}

  async migrate({ portfolio_id, do_type_name, include_type }: MigrateInput) {
    // const type = await this.modelDoTypes.findOne({
    //   where: {
    //         name: {
    //         [Op.like]: `%${}%`
    //     },
    //   },
    //   rejectOnEmpty: new Error(`Тип с id: "${do_type_id}" не найден в списке.`),
    // });
    try {
      const obj = {
        1: LawAct,
        2: LawExec,
      };
      const model_to_search = obj[include_type];

      return await this.modelPortfolio.findOne({
        logging: console.log,
        attributes: ['id', 'name'],
        where: {
          id: portfolio_id,
        },
        include: [
          {
            attributes: ['id', 'name'],
            model: Debt,
            required: true,
            include: [
              {
                attributes: ['id'],
                model: model_to_search,
                required: true,
                include: [
                  {
                    attributes: [
                      'id',
                      'obj_id',
                      'r_id',
                      'name',
                      'filename',
                      'filebody',
                      'FILE_SERVER_NAME',
                      'REL_SERVER_PATH',
                    ],
                    model: DocAttach,
                    required: true,
                    where: {
                      name: {
                        [Op.like]: `${do_type_name}%`,
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
