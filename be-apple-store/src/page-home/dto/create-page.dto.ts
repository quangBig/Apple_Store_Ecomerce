import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreatePageDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    desc?: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsString()
    link?: string;

    @IsOptional()
    @IsBoolean()
    reverse?: boolean;

    @IsOptional()
    @IsNumber()
    position?: number;
}
