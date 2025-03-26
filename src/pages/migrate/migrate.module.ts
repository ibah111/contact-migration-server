import { Debt, DocAttach, Portfolio } from '@contact/models';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import DO_Types from 'src/modules/database/sqlite/sqlite.models/do_types.model';
import MigrateController from './migrate.controller';
import MigrateService from './migrate.service';
import SmbModule from 'src/modules/smb/smb.module';

@Module({
  imports: [
    SequelizeModule.forFeature([DocAttach, Portfolio, Debt], 'contact'),
    SequelizeModule.forFeature([DO_Types], 'sqlite'),
    SmbModule,
  ],
  controllers: [MigrateController],
  providers: [MigrateService],
})
export default class MigrateModule {}
