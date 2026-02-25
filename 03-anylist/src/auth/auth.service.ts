import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { LoginInput, SignupInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';

import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService, // Manejo de usuarios en BD
        private readonly jwtService: JwtService       // Firma y verifica tokens JWT
    ) { }

    // Registro: crea usuario en BD y genera token JWT
    async signup(signupInput: SignupInput): Promise<AuthResponse> {

        // Delega la creación al servicio de usuarios (hashea password internamente)
        const user = await this.usersService.create(signupInput);

        // Genera JWT con id y email como payload
        const token = this.jwtService.sign({ id: user.id, email: user.email });

        return {
            user,
            token
        }
    }

    // Login: verifica credenciales y genera token JWT
    async login(loginInput: LoginInput): Promise<AuthResponse> {
        const user = await this.usersService.findOneByEmail(loginInput.email);

        // compareSync compara la contraseña en texto plano contra el hash almacenado
        if (!bcrypt.compareSync(loginInput.password, user.password)) {
            throw new Error('Invalid credentials, check your email and password');
        }

        const token = this.jwtService.sign({ id: user.id, email: user.email });

        return {
            token,
            user
        }
    }

    // Validación llamada por JwtStrategy en cada petición protegida
    async validateUser(id: string): Promise<User> {
        const user = await this.usersService.findOneById(id);
        if (!user.isActive)
            throw new UnauthorizedException('User is inactive, contact support');

        // Elimina password del objeto antes de retornarlo por seguridad
        const { password: _, ...userWithoutPassword } = user;

        return userWithoutPassword as User;
    }

    // Genera un token nuevo sin pedir credenciales (el usuario ya está autenticado)
    revalidateToken(user: User): AuthResponse {
        const token = this.jwtService.sign({ id: user.id, email: user.email });

        return {
            token,
            user
        }
    }

    blockUser(id: string): Promise<User> {
        return this.usersService.blockUser(id);
    }

}
