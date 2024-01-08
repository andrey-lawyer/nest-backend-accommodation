import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import * as toStream from 'buffer-to-stream';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      try {
        const upload = v2.uploader.upload_stream((error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });

        toStream(file.buffer).pipe(upload);
      } catch (error) {
        reject(error);
      }
    });
  }
}
