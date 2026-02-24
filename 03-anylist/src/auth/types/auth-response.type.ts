import { Field, ObjectType } from "@nestjs/graphql";

import { User } from "src/users/entities/user.entity";

// Tipo de salida GraphQL para signup, login y revalidate
@ObjectType()
export class AuthResponse {
    @Field(() => String)
    token: string;       // JWT generado

    @Field(() => User)
    user: User;          // Datos del usuario autenticado
}