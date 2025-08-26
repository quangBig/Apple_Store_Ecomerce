import { IsOptional, IsString } from 'class-validator';

export class CreateMainHeaderDto {
    @IsString()
    nameTitle: string;

    @IsString()
    description: string;
}
