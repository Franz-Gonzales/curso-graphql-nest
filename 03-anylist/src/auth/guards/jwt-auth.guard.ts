import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

// Guard que protege rutas: verifica que el request tenga un JWT válido
// Extiende AuthGuard('jwt') para activar la JwtStrategy de Passport
export class JwtAuthGuard extends AuthGuard('jwt') {

    // En GraphQL el contexto es diferente al de REST,
    // por eso extraemos el request desde GqlExecutionContext
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        return request;
    }
}
