import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto); // Truyền nguyên bản DTO
    }
}