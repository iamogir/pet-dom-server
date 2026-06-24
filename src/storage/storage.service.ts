import { Injectable } from '@nestjs/common';
import cloudinary from './cloudinary.service';

@Injectable()
export class StorageService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'pet-dom',
          resource_type: 'image',
          transformation: {
            fetch_format: 'auto',
            quality: 'auto',
          },
        },
        (error, result) => {
          if (error) return reject(error as Error);
          if (!result) {
            return reject(new Error('Cloudinary upload failed'));
          }
          const optimizedUrl = result.secure_url.replace(
            '/upload/',
            '/upload/f_auto,q_auto/',
          );

          resolve(optimizedUrl);
        },
      );
      uploadStream.end(file.buffer);
    });
  }
}
