import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ModulesModule from './modules/modules.module';
import { ConfigModule } from '@nestjs/config';
import { node } from './main';
import { database } from './config/contact.database.config';
import PagesModule from './pages/pages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database],
      envFilePath: '.env.dev',
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
    node === 'dev' ? console.log(process.env) : '';
  }
}
