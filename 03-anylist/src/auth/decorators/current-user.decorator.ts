import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ForbiddenError } from '@nestjs/apollo';

import { ValidRoles } from '../enums/valid-roles.enum';
import { User } from 'src/users/entities/user.entity';

// Decorador personalizado que extrae el usuario autenticado del request
// Uso: @CurrentUser() user → sin validar roles
//      @CurrentUser([ValidRoles.admin]) user → solo admin puede acceder
export const CurrentUser = createParamDecorator(
    (roles: ValidRoles[] = [], context: ExecutionContext) => {

        // Extrae el request del contexto GraphQL
        const cxt = GqlExecutionContext.create(context);
        const req = cxt.getContext().req;
        
        // request.user fue asignado por JwtStrategy.validate()
        const user: User = req.user;

        // Si no hay usuario, el guard no se aplicó correctamente
        if (!user) {
            throw new InternalServerErrorException('User not found in request. Make sure that the authentication guard is being used');
        }

        // Si no se piden roles específicos, retorna el usuario directamente
        if(roles.length === 0) return user;
        
        // Verifica que el usuario tenga al menos uno de los roles requeridos
        for (const role of user.roles) {
            if(roles.includes(role as ValidRoles)){
                return user;
            }
        }

        throw new ForbiddenError(`User ${user.fullName} does not have the required roles to access this resource`);
    }
);