import { ApiPropertyOptional } from '@nestjs/swagger';

export class DoTypesInput {
  @ApiPropertyOptional()
  id?: number;

  @ApiPropertyOptional({
    default: '',
  })
  name?: string;
}

export class NameInput {
  @ApiPropertyOptional({
    default: '',
  })
  name: string;
}
