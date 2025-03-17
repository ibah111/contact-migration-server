import { ApiProperty } from '@nestjs/swagger';

export default class PathInput {
  @ApiProperty()
  portfolio_name: string;
}
