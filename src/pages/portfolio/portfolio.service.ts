import { Portfolio } from '@contact/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@sql-tools/nestjs-sequelize';

@Injectable()
export default class PortfolioService {
  constructor(
    @InjectModel(Portfolio, 'contact')
    private readonly modelPortfolio: typeof Portfolio,
  ) {}

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
