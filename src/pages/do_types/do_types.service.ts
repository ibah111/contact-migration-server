import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import DO_Types from 'src/modules/database/sqlite/sqlite.models/do-types.model';
import { DoTypesInput } from './do_types.input';
import { Op } from 'sequelize';

@Injectable()
export default class DO_TypesService {
  constructor(
    @InjectModel(DO_Types, 'sqlite')
    private readonly modelDoType: typeof DO_Types,
  ) {}

  async createDoTypes({ name }: DoTypesInput) {
    return await this.modelDoType.create({
      name,
    });
  }

  async readDoTypes({ name }: DoTypesInput) {
    return await this.modelDoType.findAll({
      attributes: ['id', 'name'],
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
  }

  async updateDoTypes({ id, name }: DoTypesInput) {
    return await this.modelDoType.update(
      {
        name,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  async deleteDoTypes({ id }) {
    return await this.modelDoType.destroy({
      where: {
        id,
      },
    });
  }
}
