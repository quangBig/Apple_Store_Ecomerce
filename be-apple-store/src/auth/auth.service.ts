import { BadRequestException, ConflictException, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login-user.dto';
import { log } from 'console';




@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async register(createUserDto: CreateUserDto) {
        const { password, confirmpassword, ...userData } = createUserDto;
        if (password !== confirmpassword) {
            throw new BadRequestException('Password và ConfirmPassword phải giống nhau');
        }
        return this.usersService.create({ ...userData, password, confirmpassword });
    }

    async login(loginDto: LoginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        // Kiểm tra user tồn tại và có trường password không
        if (!user || !user.password) {
            throw new UnauthorizedException('Invalid credentials');
        }
        if (!(await bcrypt.compare(loginDto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { email: user.email, sub: user._id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);

        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user.toObject();
            return result;
        }
        return null;
    }
    async validateGoogleUser(profile: {
        email: string;
        name: string;
        googleId: string;
    }) {
        let user = await this.usersService.findByEmail(profile.email);

        if (!user) {
            user = await this.usersService.create({
                name: `${profile.name}`,
                email: profile.email,
                phonenumber: '',
                password: 'google-oauth-no-password',
                confirmpassword: 'google-oauth-no-password',
                googleId: profile.googleId,
                role: 'user',
            });
        }
        console.log(profile, "profile");
        return user.toObject();
    }


    async validateOAuthLogin(
        profile: {
            email: string,
            name: string,
            facebookId: string,
        }) {
        let user = await this.usersService.findByEmail(profile.email);
        if (!user) {
            user = await this.usersService.create({
                name: `${profile.name}`,
                email: profile.email,
                phonenumber: '',
                password: 'google-oauth-no-password',
                confirmpassword: 'google-oauth-no-password',
                facebookId: profile.facebookId,
                role: 'user',
            });
        }
        return user;
    }

    async addPhoneNumber(userId: string, phone: string) {
        const existingPhone = await this.usersService.findByPhone(phone);
        if (existingPhone) {
            throw new ConflictException('Số điện thoại đã tồn tại.');
        }

        return this.usersService.updateUser(userId, { phonenumber: phone });
    }
}
