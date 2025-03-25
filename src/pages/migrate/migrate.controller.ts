import { Controller } from '@nestjs/common';
import MigrateService from './migrate.service';

@Controller('migrate')
export default class MigrateController {
    constructor(
      private readonly migrateService: MigrateService
  ) {}
}
