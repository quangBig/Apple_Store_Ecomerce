import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
    async uploadFile(file: Express.Multer.File) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'uploads' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );

            const readable = new Readable();
            readable._read = () => { }; // noop
            readable.push(file.buffer);
            readable.push(null);

            readable.pipe(uploadStream);
        });
    }
}
