import { ApiProperty } from '@nestjs/swagger';
import { IUserResponse } from '@modules/auth/interfaces/iLogin.response';

export class LoginResponseSchema {
  @ApiProperty()
  accessToken: string;

  @ApiProperty({
    type: 'object',
    name: 'user',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      lastName: { type: 'string' },
      email: { type: 'string', format: 'email' },
      type: { type: 'string', enum: ['admin', 'client'] },
    },
  })
  user: IUserResponse;
}
