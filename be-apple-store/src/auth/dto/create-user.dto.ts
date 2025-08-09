import { IsEmail, IsNotEmpty, IsString, MinLength, Matches, Validate, IsOptional } from 'class-validator';
import { IsPasswordMatchingConstraint } from '../decorators/is-password-matching.decorator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
    phonenumber: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    confirmpassword: string;

}

