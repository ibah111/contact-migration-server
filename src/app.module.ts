import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ModulesModule from './modules/modules.module';
import { ConfigModule } from '@nestjs/config';
import { node } from './main';
import { database } from './config/contact.database.config';

const envFilePath = '.env.' + node;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database],
      envFilePath,
    }),
    ModulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log('Application launched in ' + `${node}`.yellow + ' mode');
  }
}
