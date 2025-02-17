import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ModulesModule from './modules/modules.module';
import { ConfigModule } from '@nestjs/config';
import contactDatabaseConfig from './config/contact.database.config';
import { node } from './main';

const envFilePath = '.env.' + node;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [contactDatabaseConfig],
      envFilePath: '.env.' + node,
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
