import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UsersService } from '@modules/users/services/users.service';
import {
  CreateAdminSchema,
  CreateUserSchema,
} from '@/components/schemas/create-user.schema';
import { HttpResponse } from '@common/http-responses/http.response';
import { ClientDto } from '@modules/users/dto/client.dto';
import { ErrorHandler } from '@common/decorators/error-handler.decorator';
import { CreateAddressDto } from '@modules/users/dto/create-address.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiExtraModels(CreateUserSchema)
  @ApiCreatedResponse({
    description: 'User created successfully',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: HttpStatus.OK },
        message: { type: 'string', example: 'Admin created successfully' },
        data: {
          $ref: getSchemaPath(CreateUserSchema),
        },
      },
    },
  })
  @ErrorHandler()
  async create(
    @Body() userDto: ClientDto,
  ): Promise<HttpResponse<CreateAdminSchema>> {
    const user = await this.usersService.createClient(userDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
      data: user,
    };
  }

  @Post('addresses/create')
  @ErrorHandler()
  async createAddress(@Body() addressDto: CreateAddressDto) {
    const data = await this.usersService.createAddress(addressDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Address created successfully',
      data,
    };
  }

  @Get('my-addresses/:userId')
  @ErrorHandler()
  async getMyAddresses(@Body('userId') userId: string) {
    const addresses = await this.usersService.getAddressesByUserId(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'Addresses retrieved successfully',
      data: addresses,
    };
  }
}
