import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SMBPathInput {
  @ApiProperty({
    description: '',
    default: '',
  })
  @IsString()
  path: string;
}
