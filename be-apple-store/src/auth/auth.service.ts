import { BadRequestException, ConflictException, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login-user.dto';
import { log } from 'console';
import { Model } from 'mongoose';
import { User } from '../users/schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';




@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
        private usersService: UsersService,
        private jwtService: JwtService) { }

    async register(createUserDto: CreateUserDto) {
        const { email, password, confirmpassword, name, phonenumber } = createUserDto;

        // Kiểm tra email tồn tại
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException('Email đã tồn tại');
        }

        // Tạo user mới
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
            phonenumber: phonenumber || null  // Lưu null nếu không có số điện thoại
        });

        const { password: _, ...result } = user.toObject();
        return result;
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
                name: profile.name,
                email: profile.email,
                password: 'google-oauth-no-password',
                confirmpassword: 'google-oauth-no-password',
                googleId: profile.googleId,
                role: 'user',
            });
        }

        return user;
    }


    async validateOAuthLogin(
        profile: {
            email: string,
            name: string,
        }) {
        let user = await this.usersService.findByEmail(profile.email);
        if (!user) {
            user = await this.usersService.create({
                name: profile.name,
                email: profile.email,
                password: 'google-oauth-no-password',
                confirmpassword: 'google-oauth-no-password',
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