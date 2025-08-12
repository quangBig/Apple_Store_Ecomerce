import { Body, Controller, Post, UsePipes, ValidationPipe, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Role } from './decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Post('google')
    async googleLogin(@Body('token') token: string) {
        return this.authService.authenticateWithGoogle(token);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {

    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Request() req: any) {
        const { user, access_token } = req.user;
        return {
            access_token,
            user
        };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Role('admin')
    @Get('admin-only')
    getAdminData() {
        return 'Chỉ admin mới thấy được!';
    }
}