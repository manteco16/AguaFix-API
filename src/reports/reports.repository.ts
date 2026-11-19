
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { Report } from './entities/report.entity';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsRepository {
  constructor(
    @InjectRepository(Report)
    private readonly repository: Repository<Report>,
  ) {}

  async create(
    createReportDto: CreateReportDto,
    photoUrl: string,
  ): Promise<Report> {
    const report = this.repository.create({
      ...createReportDto,
      photoUrl,
    } as DeepPartial<Report>);

    return this.repository.save(report);
  }

  async findAll(): Promise<Report[]> {
    return this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
