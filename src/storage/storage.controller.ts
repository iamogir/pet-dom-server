import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}
  @Post('test-upload')
  @UseInterceptors(FileInterceptor('avatar'))
  async testUpload(@UploadedFile() file: any) {
    const url = await this.storageService.uploadImage(file);
    console.log(file);
    return {
      url,
    };
  }
}
