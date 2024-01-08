import { Readable } from 'stream';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v2, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

@Injectable()
export class FilesService {
  async createFile(file: Express.Multer.File): Promise<string> {
    try {
      const stream = new Readable();
      stream.push(file.buffer);
      stream.push(null);

      const uploadResult = await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          const uploadStream = v2.uploader.upload_stream(
            { resource_type: 'auto' },
            (
              error: UploadApiErrorResponse | undefined,
              result: UploadApiResponse | undefined,
            ) => {
              if (error) {
                reject(error);
              }
              if (result) {
                resolve(result);
              }
            },
          );

          stream.pipe(uploadStream);
        },
      );

      return uploadResult.secure_url;
    } catch (e) {
      console.error('Error processing file:', e);
      throw new HttpException(
        'Error processing file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
