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

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleLogin() {

    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Request() req) {
        const { user, access_token } = req.user;
        return {
            access_token,
            user
        };
    }
    @Get('facebook')
    @UseGuards(AuthGuard('facebook'))
    async facebookLogin() {
        // Passport sẽ redirect tới Facebook
    }

    @Get('facebook/callback')
    @UseGuards(AuthGuard('facebook'))
    async facebookCallback(@Request() req) {
        return {
            message: 'Login Facebook thành công',
            user: req.user,
        };
    }
    @UseGuards(JwtAuthGuard)
    @Post('facebook/add-phone')
    async addPhone(@Request() req, @Body() body: { phone: string }) {
        return this.authService.addPhoneNumber(req.user._id, body.phone);
    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Role('admin')
    @Get('admin-only')
    getAdminData() {
        return 'Chỉ admin mới thấy được!';
    }
}