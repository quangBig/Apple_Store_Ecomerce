import { IsString, IsOptional } from "class-validator";

export class CreateChatDto {
    @IsOptional()
    @IsString()
    userId?: string;   // nếu login thì có, guest thì bỏ trống

    @IsString()
    message: string;
}
