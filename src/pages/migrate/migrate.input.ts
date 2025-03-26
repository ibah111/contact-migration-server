import { ApiProperty } from '@nestjs/swagger';

export class MigrateInput {
  @ApiProperty({
    description: 'Тип документа',
    default: '',
  })
  do_type_name: string;
  @ApiProperty({
    description: 'id портфеля',
    default: 0,
  })
  r_portfolio_id: number;
  @ApiProperty({
    description: 'Тип вложения: 1 - судебная работа, 2 - испол. пр-во',
    default: 1,
  })
  include_type: 1 | 2;
  @ApiProperty({
    default: false,
  })
  upload: boolean;
}
