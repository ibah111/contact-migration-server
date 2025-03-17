import { Module } from '@nestjs/common';
import PathService from './path.service';
import PathController from './path.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  Debt,
  Dict,
  DocAttach,
  LawAct,
  LawExec,
  Portfolio,
} from '@contact/models';

@Module({
  imports: [
    SequelizeModule.forFeature(
      [Dict, Portfolio, Debt, LawAct, LawExec, DocAttach],
      'contact',
    ),
  ],
  providers: [PathService],
  exports: [PathService],
  controllers: [PathController],
})
export default class PathModule {}
