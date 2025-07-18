import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './schemas/users.schema';



@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async create(userData: {
        LastName: string;
        Name: string;
        Email: string;
        PhoneNumber: string;
        Password: string;
        ConfirmPassword: string;
    }): Promise<User> {
        // Kiểm tra email tồn tại
        const existingEmail = await this.userModel.findOne({ Email: userData.Email }).exec();
        if (existingEmail) {
            throw new ConflictException('Email đã tồn tại');
        }

        // Kiểm tra số điện thoại tồn tại
        const existingPhone = await this.userModel.findOne({ PhoneNumber: userData.PhoneNumber }).exec();
        if (existingPhone) {
            throw new ConflictException('Số điện thoại đã tồn tại');
        }

        // Kiểm tra pass và confirmpass
        if (userData.Password !== userData.ConfirmPassword) {
            throw new ConflictException('Sai mật khẩu hoặc nhập lại mật khẩu');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(userData.Password, 10);

        const newUser = new this.userModel({
            LastName: userData.LastName,
            Name: userData.Name,
            Email: userData.Email,
            PhoneNumber: userData.PhoneNumber,
            Password: hashedPassword
        });

        return newUser.save();
    }
}