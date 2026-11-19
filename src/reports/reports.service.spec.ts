import { Test, TestingModule } from '@nestjs/testing';

import { ReportsService } from './reports.service';
import { ReportsRepository } from './reports.repository';
import { EmailService } from '../email/email.service';
import { StorageService } from '../storage/storage.service';

describe('ReportsService', () => {
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: ReportsRepository,
          useValue: {},
        },
        {
          provide: EmailService,
          useValue: {},
        },
        {
          provide: StorageService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
