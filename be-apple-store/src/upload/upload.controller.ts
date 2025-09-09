import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.sevice';


@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file', { storage: undefined })) // memoryStorage mặc định
    async upload(@UploadedFile() file: Express.Multer.File) {
        const result = await this.uploadService.uploadFile(file);
        return result;
    }
}
