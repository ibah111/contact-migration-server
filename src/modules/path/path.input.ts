import { ApiProperty } from '@nestjs/swagger';

export default class PathInput {
  @ApiProperty({
    description: '<<Like>> поиск по портфелям',
    default: '',
  })
  portfolio_name: string;
}
