import { Injectable, Logger } from '@nestjs/common';

import { ReportsRepository } from './reports.repository';
import { CreateReportDto } from './dtos/create-report.dto';
import { EmailService } from '../email/email.service';
import { StorageService } from '../storage/storage.service';
import { envs } from '../config/envs';
import { generateReportTemplate } from './templates/report.template';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(
    private readonly reportsRepository: ReportsRepository,
    private readonly emailService: EmailService,
    private readonly storageService: StorageService,
  ) {}

  async create(
    createReportDto: CreateReportDto,
    photo: Express.Multer.File,
  ) {
    const photoUrl = await this.storageService.uploadFile(photo, 'reports');

    const report = await this.reportsRepository.create(
      createReportDto,
      photoUrl,
    );

    const template = generateReportTemplate(createReportDto, photoUrl);

    // El reporte ya quedó guardado. Si el correo falla, no se pierde el registro.
    try {
      await this.emailService.sendEmail(
        envs.mailer.to,
        'Nuevo reporte de fuga de agua - AguaFix',
        template,
      );
    } catch (error) {
      this.logger.error(
        'El reporte se guardó, pero no se pudo enviar el correo',
        error instanceof Error ? error.stack : String(error),
      );
    }

    return report;
  }

  async findAll(): Promise<Report[]> {
    return this.reportsRepository.findAll();
  }
}
