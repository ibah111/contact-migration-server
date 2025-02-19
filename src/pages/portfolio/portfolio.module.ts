import { Portfolio } from '@contact/models';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import PortfolioController from './portfolio.controller';
import PortfolioService from './portfolio.service';

@Module({
  imports: [SequelizeModule.forFeature([Portfolio], 'contact')],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {}
