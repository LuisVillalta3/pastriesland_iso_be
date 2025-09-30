import { ApiProperty } from '@nestjs/swagger';

export class CreateUserSchema {
  @ApiProperty()
  name: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;
}

export class CreateAdminSchema extends CreateUserSchema {
  @ApiProperty()
  password: string;
}
