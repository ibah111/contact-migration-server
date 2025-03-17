import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import PathService from './path.service';
import { ApiTags } from '@nestjs/swagger';
import PathInput from './path.input';

@ApiTags('path')
@Controller('path')
export default class PathController {
  constructor(private readonly service: PathService) {}

  @Post('getDict')
  protected async getDict() {
    return await this.service.dict();
  }

  @Post('portfolio')
  protected async getPortfolio(@Body() { portfolio_name }: PathInput) {
    return await this.service.portfolios(portfolio_name);
  }

  @Get('portfolio/:id')
  protected async portfolioByParam(@Param('id') id: number) {
    return await this.service.getPortfolio(id);
  }
}
