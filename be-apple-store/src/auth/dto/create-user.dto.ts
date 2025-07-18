import { IsEmail, IsNotEmpty, IsString, MinLength, Matches, Validate } from 'class-validator';
import { IsPasswordMatchingConstraint } from '../decorators/is-password-matching.decorator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    LastName: string;

    @IsNotEmpty()
    @IsString()
    Name: string;

    @IsEmail()
    Email: string;

    @IsNotEmpty()
    @Matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
    PhoneNumber: string;

    @IsNotEmpty()
    @MinLength(8)
    Password: string;

    @IsNotEmpty()
    @Validate(IsPasswordMatchingConstraint)
    ConfirmPassword: string;
}