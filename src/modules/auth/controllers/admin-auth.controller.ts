import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AuthDto } from '@modules/auth/dto/auth.dto';
import { AuthService } from '@modules/auth/auth.service';
import { LoginResponseSchema } from '@/components/schemas/login-response.schema';
import { ErrorHandler } from '@common/decorators/error-handler.decorator';

@Controller('admin/auth')
@ApiTags('Authentication')
export class AdminAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiExtraModels(LoginResponseSchema)
  @ApiOkResponse({
    description: 'Login successful',
    schema: {
      allOf: [{ $ref: getSchemaPath(LoginResponseSchema) }],
    },
  })
  @ErrorHandler()
  login(@Body() { email, password }: AuthDto) {
    return this.authService.login({ email, password, type: 'admin' });
  }
}
