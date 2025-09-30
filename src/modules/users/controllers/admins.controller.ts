import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { AdminsService } from '@modules/users/services/admins.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UserDto } from '@modules/users/dto/user.dto';
import { HttpResponse } from '@common/http-responses/http.response';
import { CreateAdminSchema } from '@/components/schemas/create-user.schema';
//import { AdminAuthGuard } from '@modules/auth/guards/admin.guard';
import { ErrorHandler } from '@common/decorators/error-handler.decorator';

@Controller('admin/admins')
@ApiTags('Admins')
export class AdminsController {
  constructor(private readonly adminService: AdminsService) {}

  @Post()
  @ApiExtraModels(CreateAdminSchema)
  @ApiCreatedResponse({
    description: 'Admin created successfully',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: HttpStatus.OK },
        message: { type: 'string', example: 'Admin created successfully' },
        data: {
          $ref: getSchemaPath(CreateAdminSchema),
        },
      },
    },
  })
  @ErrorHandler()
  async createAdmin(
    @Body() userDto: UserDto,
  ): Promise<HttpResponse<CreateAdminSchema>> {
    const admin = await this.adminService.createAdmin(userDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Admin created successfully',
      data: admin,
    };
  }

  @Get()
  @ApiBearerAuth()
  async getAllAdmins() {
    return await this.adminService.getAllAdmins();
  }
}
