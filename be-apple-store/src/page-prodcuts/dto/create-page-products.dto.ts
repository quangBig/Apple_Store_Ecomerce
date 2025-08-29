import { IsNotEmpty, IsString } from "class-validator";

export class CreatePageProductsDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    slug: string;

    @IsString()
    @IsNotEmpty()
    image: string;
}