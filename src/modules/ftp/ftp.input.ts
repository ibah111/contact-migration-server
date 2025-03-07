import { ApiProperty } from '@nestjs/swagger';

export interface FtpProps {
  host: string;
  user: string;
  password: string;
}

export class FtpInput {
  @ApiProperty({
    default: '/TEST_IBAH/',
  })
  path: string;
}
