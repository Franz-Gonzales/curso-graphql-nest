import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';

// Módulo que orquesta toda la autenticación: JWT, Passport y usuarios
@Module({
  providers: [AuthResolver, AuthService, JwtStrategy],
  imports: [
    UsersModule,       // Acceso a UsersService 
    PassportModule,    // Integra Passport.js para manejar estrategias de auth
    ConfigModule,      // Acceso a variables de entorno (.env)

    // registerAsync espera a que ConfigService cargue las variables del .env
    // antes de configurar el módulo JWT (register síncrono fallaría)
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
      }),
    })

  ],
  // Exportamos para que otros módulos puedan proteger sus rutas
  exports: [AuthService, PassportModule, JwtModule],
})
export class AuthModule { }
