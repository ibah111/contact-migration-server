import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ModulesModule from './modules/modules.module';
import { ConfigModule } from '@nestjs/config';

import { database } from './config/contact.database.config';
import PagesModule from './pages/pages.module';
import { smb } from './config/smb.config';
import { ftp } from './config/ftp.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev', '.env.smb', '.env.ftp'],
      load: [database, smb, ftp],
    }),
    ModulesModule,
    PagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
