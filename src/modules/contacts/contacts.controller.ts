import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContactDto } from '@modules/contacts/contact.dto';
import { ErrorHandler } from '@common/decorators/error-handler.decorator';
import { HttpResponse } from '@common/http-responses/http.response';
import { ContactsService } from '@modules/contacts/contacts.service';
import { AdminAuthGuard } from '@modules/auth/guards/admin.guard';

@Controller('contacts')
@ApiTags('Contacts')
export class ContactsController {
  constructor(private readonly contactService: ContactsService) {}

  @Post()
  @ErrorHandler()
  async create(@Body() contactDto: ContactDto): Promise<HttpResponse<any>> {
    const data = await this.contactService.create(contactDto);

    return {
      statusCode: HttpStatus.CREATED,
      data,
      message: 'Contacto guardado exitosamente',
    };
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  @ErrorHandler()
  async findAll(): Promise<HttpResponse<any>> {
    const data = await this.contactService.findAll();

    return {
      statusCode: HttpStatus.OK,
      data,
      message: 'Products got successfully',
    };
  }
}
