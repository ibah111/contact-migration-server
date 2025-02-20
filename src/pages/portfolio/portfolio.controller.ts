import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import PortfolioService from './portfolio.service';

@ApiTags('portfolio')
@Controller('portfolio')
export default class PortfolioController {
  constructor(private readonly service: PortfolioService) {}

  @Get('all')
  async prots() {
    return await this.service.ports();
  }

  @Get('docAttach')
  async docAttach() {
    return await this.service.docAttach();
  }
}
