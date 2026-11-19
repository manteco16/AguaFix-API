import {
  BadRequestException,
  Controller,
  Post,
  Get,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';

@Controller('reports')
export class ReportsController {

  constructor(
    private readonly reportsService: ReportsService,
  ) {}

  @Post()
@UseInterceptors(
  FileInterceptor('photo', {
    storage: memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, callback) => {
      if (!file.mimetype.startsWith('image/')) {
        return callback(
          new BadRequestException('El archivo debe ser una imagen'),
          false,
        );
      }
      callback(null, true);
    },
  }),
)
create(
  @Body() dto: CreateReportDto,
  @UploadedFile() photo: Express.Multer.File,
) {
  if (!photo) {
    throw new BadRequestException('La foto de la fuga es obligatoria');
  }

  return this.reportsService.create(dto, photo);
}

  @Get()
  async findAll() {
    return await this.reportsService.findAll();
  }
}