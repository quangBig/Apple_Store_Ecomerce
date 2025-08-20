import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreatePageDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    decs: string;

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsString()
    @IsNotEmpty()
    link: string;

    @IsBoolean()
    reverse: boolean;
}
