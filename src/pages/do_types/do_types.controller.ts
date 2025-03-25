import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { DoTypesInput, NameInput } from './do_types.input';
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

  @Post('read')
  async readDoTypes(@Body() { name }: NameInput) {
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
