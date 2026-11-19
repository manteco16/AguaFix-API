import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../auth/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find({
      select: {
        id: true,
        name: true,
        email: true,
        isNotificationEnabled: true,
      },
    });
  }

  async findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        isNotificationEnabled: true,
      },
    });
  }
}
