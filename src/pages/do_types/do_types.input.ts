import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DoTypesInput {
  @ApiPropertyOptional()
  id?: number;

  @ApiPropertyOptional({
    default: '',
  })
  name?: string;
}
