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
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
    private readonly googleClient: OAuth2Client;

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
        this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }

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
        console.log(profile, "profile");
        return user.toObject();
    }

    async validateOAuthLogin(
        profile: {
            email: string;
            name: string;
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
    async validateOrCreateGoogleUser(payload: any) {
        const email = payload.email;
        let user = await this.usersService.findByEmail(email);

        if (!user) {
            // Nếu chưa có user thì tạo mới
            user = await this.usersService.create({
                email,
                name: payload.name,
                password: 'google-oauth-no-password', // Google login không cần password
                confirmpassword: 'google-oauth-no-password',
                googleId: payload.sub
            });
        }

        return user;
    }

    async authenticateWithGoogle(token: string) {
        try {
            // Verify the Google ID token
            const ticket = await this.googleClient.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();
            if (!payload?.email) {
                throw new UnauthorizedException('Invalid Google token: Missing email');
            }

            // Find or create user
            const user = await this.userModel.findOneAndUpdate(
                { email: payload.email },
                {
                    $setOnInsert: {
                        name: payload.name || payload.email.split('@')[0],
                        email: payload.email,
                        password: 'google-oauth-no-password',
                        googleId: payload.sub,
                        role: 'user',
                    }
                },
                {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true
                }
            );

            // Generate JWT
            const jwtPayload = {
                sub: user._id,
                email: user.email,
                role: user.role
            };

            return {
                access_token: this.jwtService.sign(jwtPayload),
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            };
        } catch (error) {
            console.error('Google authentication error:', error);
            throw new UnauthorizedException('Google authentication failed');
        }
    }

    generateJwt(user: any) {
        const payload = { sub: user._id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }
}
