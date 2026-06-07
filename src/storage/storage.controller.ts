import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('storage')
export class StorageController {
  @Post('test-upload')
  @UseInterceptors(FileInterceptor('avatar'))
  testUpload(@UploadedFile() file: any) {
    console.log(file);
    return {
      success: true,
      filename: file.originalname,
      size: file.size,
    };
  }
}
