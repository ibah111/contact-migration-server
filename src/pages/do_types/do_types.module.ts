import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import DO_Types from 'src/modules/database/sqlite/sqlite.models/do_types.model';
import DO_TypesController from './do_types.controller';
import DO_TypesService from './do_types.service';

@Module({
  exports: [DO_TypesService],
  providers: [DO_TypesService],
  controllers: [DO_TypesController],
  imports: [SequelizeModule.forFeature([DO_Types], 'sqlite')],
})
export default class DO_TypesModule {}
