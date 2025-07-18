import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async register(createUserDto: CreateUserDto) {
        const { Password, ConfirmPassword, ...userData } = createUserDto;
        if (Password !== ConfirmPassword) {
            throw new BadRequestException('Password và ConfirmPassword phải giống nhau');
        }
        return this.usersService.create({ ...userData, Password, ConfirmPassword });
    }
}