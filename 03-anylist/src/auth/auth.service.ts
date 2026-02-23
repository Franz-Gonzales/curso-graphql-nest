import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { LoginInput, SignupInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService
    ) {}

    async signup(signupInput: SignupInput): Promise<AuthResponse> {

        // Crear un usuario
        const user = await this.usersService.create(signupInput);

        return {
            user,
            token: 'fake-jwt-token'
        }
    }


    async login(loginInput: LoginInput): Promise<AuthResponse> {
        const user = await this.usersService.findOneByEmail(loginInput.email);

        if(!bcrypt.compareSync(loginInput.password, user.password)) {
            throw new Error('Invalid credentials, check your email and password');
        }

        const token = 'ABS122';

        return {
            token,
            user
        }
    }
}
