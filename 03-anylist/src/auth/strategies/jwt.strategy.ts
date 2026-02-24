import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { AuthService } from "../auth.service";

// Estrategia JWT: define cómo se extrae, verifica y valida el token en cada petición protegida
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ) {
        super({
            // Extrae el token del header: "Authorization: Bearer <token>"
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // Rechaza tokens expirados automáticamente
            ignoreExpiration: false,
            // Clave secreta para verificar la firma del token
            secretOrKey: configService.get<string>('JWT_SECRET')!,
        });
    }

    // Se ejecuta DESPUÉS de que Passport verifica la firma y expiración del token
    // Lo que retorne se asigna a request.user (disponible vía @CurrentUser)
    async validate(payload: JwtPayload): Promise<User> {

        const user = await this.authService.validateUser(payload.id);

        console.log({user});
        
        return user;

    }
}