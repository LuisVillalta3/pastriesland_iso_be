import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AuthService } from '@modules/auth/auth.service';
import { LoginResponseSchema } from '@/components/schemas/login-response.schema';
import { AuthDto } from '@modules/auth/dto/auth.dto';
import { ErrorHandler } from '@common/decorators/error-handler.decorator';

@Controller('auth')
@ApiTags('Authentication')
export class ClientAuthController {
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
    return this.authService.login({ email, password, type: 'client' });
  }
}
