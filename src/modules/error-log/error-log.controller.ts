import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ErrorLogService } from '@modules/error-log/error-log.service';
import { ErrorHandler } from '@common/decorators/error-handler.decorator';

@Controller('admin/logs')
@ApiTags('Logs')
export class ErrorLogController {
  constructor(private readonly errorLogService: ErrorLogService) {}

  @Get()
  @ErrorHandler()
  async getErrorLog() {
    return await this.errorLogService.getAll();
  }
}
