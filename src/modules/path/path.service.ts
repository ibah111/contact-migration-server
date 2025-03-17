import {
  Dict,
  Debt,
  Portfolio,
  DocAttach,
  LawAct,
  LawExec,
} from '@contact/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

@Injectable()
export default class PathService {
  constructor(
    @InjectModel(Dict, 'contact') private readonly dictModel: typeof Dict,
    @InjectModel(Portfolio, 'contact')
    private readonly modelPortfolio: typeof Portfolio,
    @InjectModel(DocAttach, 'contact')
    private readonly modelDocAttach: typeof DocAttach,
    @InjectModel(Debt, 'contact')
    private readonly modelDebt: typeof Debt,
  ) {}

  async dict() {
    return await this.dictModel.findAll();
  }

  async portfolios(portfolio_name: string) {
    return await this.modelPortfolio.findAll({
      where: {
        name: {
          [Op.like]: `%${portfolio_name}%`,
        } as any,
      },
    });
  }

  async getPortfolio(id: number) {
    console.log('portfolio_id', id);
    const doc_attach_attributes = [
      'id',
      'obj_id',
      'name',
      'filename',
      'filebody',
      'FILE_SERVER_NAME',
      'REL_SERVER_PATH',
    ];
    return await this.modelPortfolio.findOne({
      where: {
        id,
      },
      logging: console.log,
      attributes: ['id', 'name'],
      include: [
        {
          model: Debt,
          attributes: ['id'],
        },
        {
          model: LawAct,
          attributes: ['id'],
          include: [
            {
              required: true,
              attributes: doc_attach_attributes,
              model: DocAttach,
            },
          ],
        },
        {
          model: LawExec,
          attributes: ['id'],
          include: [
            {
              required: true,
              attributes: doc_attach_attributes,
              model: DocAttach,
            },
          ],
        },
      ],
    });
  }

  async docAttach(portfolio_id: number) {
    const debts = await this.modelDebt.findAll({
      where: {
        r_portfolio_id: portfolio_id,
      },
      include: [],
    });
  }
}
