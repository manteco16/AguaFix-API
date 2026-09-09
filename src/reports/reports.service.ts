import { Injectable } from '@nestjs/common';
import { ReportsRepository } from './reports.repository';
import { CreateReportDto } from './dtos/create-report.dto';
import { EmailService } from '../email/email.service';
import { envs } from '../config/envs';
import { generateReportTemplate } from './templates/report.template';

@Injectable()
export class ReportsService {
  constructor(
    private readonly reportsRepository: ReportsRepository,
    private readonly emailService: EmailService,
  ) {}

  async create(createReportDto: CreateReportDto) {
    const report = await this.reportsRepository.create(createReportDto);

    const template = generateReportTemplate(createReportDto);

    await this.emailService.sendEmail(
      envs.mailer.to,
      'Nuevo reporte de fuga de agua - AguaFix',
      template,
    );

    return report;
  }

  async findAll() {
    return this.reportsRepository.findAll();
  }
}