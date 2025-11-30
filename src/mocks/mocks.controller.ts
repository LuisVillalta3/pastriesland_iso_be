import { ErrorHandler } from '@/common/decorators/error-handler.decorator';
import { Controller, Post } from '@nestjs/common';
import { MocksService } from './mocks.service';

@Controller('mocks/populate')
export class MocksController {
  constructor(private readonly mocksService: MocksService) {}

  @Post('all')
  @ErrorHandler()
  async createMockData(): Promise<any> {
    const { email, password } = await this.mocksService.createMockAdmin();
    await this.mocksService.createMockCategories();
    await this.mocksService.createMockProducts();

    return {
      admin: {
        message:
          'Mock admin created successfully. Use the following credentials to log in:',
        email,
        password,
      },
      categories: { message: 'Mock categories created successfully.' },
    };
  }
}
