import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateSectionDto {
    @IsString()
    nameSection: string;

    @IsString()
    description: string;

    @IsString()
    image: string;

    @IsOptional()
    @IsString()
    link?: string;

    @IsOptional()
    @IsBoolean()
    reverse?: boolean;
}