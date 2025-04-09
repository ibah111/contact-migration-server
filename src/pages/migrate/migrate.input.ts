import { ApiProperty } from '@nestjs/swagger';
import { node } from 'src/main';

export class MigrateInput {
  @ApiProperty({
    description: 'Тип документа',
    default: node === 'dev' ? 'запрос' : null,
  })
  do_type_name: string;
  @ApiProperty({
    description: 'id портфеля',
    default: node === 'dev' ? 88 : null,
  })
  r_portfolio_id: number;
  @ApiProperty({
    description: 'Тип вложения: 1 - судебная работа, 2 - испол. пр-во',
    default: node === 'dev' ? 1 : null,
  })
  include_type: 1 | 2;
  @ApiProperty({
    default: node === 'dev' ? true : null,
  })
  upload: boolean;
}
