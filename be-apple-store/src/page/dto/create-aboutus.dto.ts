import { IsString } from 'class-validator';

export class CreateAboutUsDto {
    @IsString()
    nameaboutUs: string;

    @IsString()
    description: string;

    @IsString()
    image: string;
}
