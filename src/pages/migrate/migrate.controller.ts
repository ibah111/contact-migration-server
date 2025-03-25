import { Body, Controller, Post } from '@nestjs/common';
import MigrateService from './migrate.service';
import { MigrateInput } from './migrate.input';

@Controller('migrate')
export default class MigrateController {
  constructor(private readonly migrateService: MigrateService) {}

  @Post('upload')
  private async upload(
    @Body() { do_type_name, portfolio_id, include_type }: MigrateInput,
  ) {
    return await this.migrateService.migrate({
      portfolio_id,
      do_type_name,
      include_type,
    });
  }
}
