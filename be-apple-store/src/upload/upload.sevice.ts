import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class UploadService {
    async uploadFile(file: Express.Multer.File) {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'uploads' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );

            const readable = new Readable();
            readable._read = () => { };
            readable.push(file.buffer);
            readable.push(null);

            readable.pipe(stream);
        });
    }
}
