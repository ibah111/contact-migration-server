import { SwaggerCustomOptions, SwaggerDocumentOptions } from '@nestjs/swagger';

export function getSwaggerOptions() {
  const options: SwaggerDocumentOptions = {};
  return options;
}
export function getSwaggerOptionsCustom() {
  const options: SwaggerCustomOptions = {};
  options.customSiteTitle = 'contact-migration project';
  options.validatorUrl = '';
  return options;
}
