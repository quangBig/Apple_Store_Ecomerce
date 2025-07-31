import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './schemas/users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async create(userData: {
        lastname: string;
        name: string;
        email: string;
        phonenumber: string;
        password: string;
        confirmpassword: string;
        role?: string;
        googleId?: string;
    }): Promise<User> {
        // Kiểm tra email tồn tại
        const existingEmail = await this.userModel.findOne({ email: userData.email }).exec();
        if (existingEmail) {
            throw new ConflictException('Email đã tồn tại');
        }

        // Kiểm tra số điện thoại tồn tại
        const existingPhone = await this.userModel.findOne({ phonenumber: userData.phonenumber }).exec();
        if (existingPhone) {
            throw new ConflictException('Số điện thoại đã tồn tại');
        }

        // Kiểm tra pass và confirmpass
        if (userData.password !== userData.confirmpassword) {
            throw new ConflictException('Sai mật khẩu hoặc nhập lại mật khẩu');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newUser = new this.userModel({
            lastname: userData.lastname,
            name: userData.name,
            email: userData.email,
            phonenumber: userData.phonenumber,
            password: hashedPassword,
            role: userData.role || 'user'
        });

        return newUser.save();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }
}