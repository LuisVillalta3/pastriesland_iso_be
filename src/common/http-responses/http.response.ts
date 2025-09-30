import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class HttpResponse<T> {
  @ApiProperty({ type: 'number', description: 'HTTP status code' })
  statusCode: HttpStatus;

  @ApiProperty({ type: 'string', description: 'Response message' })
  message?: string;

  @ApiProperty({ description: 'Response data' })
  data?: T;
}

export class PromisedResponse<T> extends Promise<HttpResponse<T>> {}
