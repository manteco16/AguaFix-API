import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

import { envs } from '../config/envs';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  private readonly transporter = nodemailer.createTransport({
    service: envs.mailer.service,
    auth: {
      user: envs.mailer.user,
      pass: envs.mailer.password,
    },
  });

  async sendEmail(
    to: string,
    subject: string,
    template: string,
  ): Promise<void> {
    await this.transporter.sendMail({
      from: envs.mailer.user,
      to,
      subject,
      html: template,
    });

    this.logger.log(`Correo enviado a ${to}`);
  }
}
