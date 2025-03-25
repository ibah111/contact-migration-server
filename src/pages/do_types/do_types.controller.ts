import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DoTypesInput } from './do_types.input';
import DO_TypesService from './do_types.service';

@Controller('dotypes')
export default class DO_TypesController {
  constructor(private readonly service: DO_TypesService) {}

  @Post('create')
  async createDoType(@Body() { name }: DoTypesInput) {
    return await this.service.createDoTypes({
      name,
    });
  }

  @Get('read')
  async readDoTypes(@Query('name') name: string) {
    return this.service.readDoTypes({
      name,
    });
  }

  @Put('update')
  async updateDoType({ id, name }: DoTypesInput) {
    return this.service.updateDoTypes({
      id,
      name,
    });
  }

  @Delete('delete')
  async deleteDoTypes({ id }: DoTypesInput) {
    return this.service.deleteDoTypes({
      id,
    });
  }
}
