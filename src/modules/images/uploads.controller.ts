import {
  Body,
  Controller, Delete, Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminAuthGuard } from '@modules/auth/guards/admin.guard';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';
import { UploadDto } from '@modules/images/upload.dto';
import { ImagesService } from '@modules/images/images.service';

@Controller('admin/uploads')
@ApiTags('Admin - images')
@UseGuards(AdminAuthGuard)
export class UploadsController {
  constructor(private imageService: ImagesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads',
        filename(
          req: Request,
          file: Express.Multer.File,
          cb: (error: Error | null, filename: string) => void,
        ) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter(
        req: any,
        file: {
          fieldname: string;
          originalname: string;
          encoding: string;
          mimetype: string;
          size: number;
          destination: string;
          filename: string;
          path: string;
          buffer: Buffer;
        },
        cb: (error: Error | null, acceptFile: boolean) => void,
      ) {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(new Error('Only image files are allowed'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadDto: UploadDto,
  ) {
    const relativePath = `uploads/${file.filename}`;

    await this.imageService.create(relativePath, uploadDto);
  }

  @Delete(':id')
  async delete(@Param() id: number) {
    return await this.imageService.delete(id);
  }
}
