import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { ErrorLogService } from '@modules/error-log/error-log.service';

const SENSITIVE_KEYS = ['password', 'currentPassword', 'newPassword'];

@Injectable()
export class ErrorHandlerInterceptor implements NestInterceptor {
  private readonly logger: Logger;

  constructor(private readonly errorLogService: ErrorLogService) {
    this.logger = new Logger('Error Handler');
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const handlerName = context.getHandler().name;
    const controllerName = context.getClass().name;

    return next.handle().pipe(
      catchError(async (error: Error) => {
        this.showLogError(handlerName, error);

        if (!this.isKnownHttpException(error))
          await this.saveLogError(request, handlerName, controllerName, error);

        throw error;
      }),
    );
  }

  private isKnownHttpException(error: any): boolean {
    return (
      error instanceof NotFoundException || error instanceof BadRequestException
    );
  }

  private showLogError(handlerName: string, error: Error) {
    this.logger.error(`Error in ${handlerName}`, error.message, error.stack);
  }

  private async saveLogError(
    request: Request,
    handlerName: string,
    controllerName: string,
    error: Error,
  ) {
    const safeBody = { ...request.body };

    SENSITIVE_KEYS.forEach((key) => {
      if (key in safeBody) {
        safeBody[key] = '[REDACTED]';
      }
    });

    await this.errorLogService.create({
      message: error.message,
      stack: error.stack,
      payload: JSON.stringify(safeBody),
      context: `${controllerName}.${handlerName}`,
      url: request.url,
      createdAt: new Date(),
    });
  }
}
