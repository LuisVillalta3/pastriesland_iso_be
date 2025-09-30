import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ErrorHandlerInterceptor } from '@common/interceptors/error-handler.interceptor';

export function ErrorHandler() {
  return applyDecorators(UseInterceptors(ErrorHandlerInterceptor));
}
