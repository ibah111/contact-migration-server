import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ModulesModule from './modules/modules.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { node } from './main';
import { database } from './config/contact.database.config';
import PagesModule from './pages/pages.module';
import { smb } from './config/smb.config';
import { ftp } from './config/ftp.config';
import { FtpModule } from 'nestjs-basic-ftp';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev', '.env.smb', '.env.ftp'],
      load: [database, smb, ftp],
    }),
    /**
     * 
    FtpModule.register(),
    */
    FtpModule.forRootFtpAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        port: 22,
        host: config.get<string>('ftp_host'),
        user: config.get<string>('ftp_login'),
        password: config.get<string>('ftp_password'),
        secure: true,
      }),
    }),
    ModulesModule,
    PagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log('Application launched in ' + `${node}`.yellow + ' mode');
  }
}
