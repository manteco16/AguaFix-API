
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { envs } from '../config/envs';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly bucket = envs.aws.bucket;
  private readonly region = envs.aws.region;

  private readonly s3 = new S3Client({
    region: this.region,
  });

  async uploadFile(
    file: {
      originalname: string;
      buffer: Buffer;
      mimetype: string;
    },
    folder: string,
  ): Promise<string> {
    if (!file) {
      throw new InternalServerErrorException(
        'No se recibió el archivo para almacenar',
      );
    }

    const extension = extname(file.originalname).toLowerCase();
    const safeFolder = folder
      .replace(/^\/+|\/+$/g, '');

    const key = `${safeFolder}/${randomUUID()}${extension}`;

    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );

      return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
    } catch (error) {
      this.logger.error(
        'No se pudo subir el archivo a S3',
        error instanceof Error ? error.stack : String(error),
      );

      throw new InternalServerErrorException(
        'No se pudo subir el archivo a S3',
      );
    }
  }
}
