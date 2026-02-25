import { registerEnumType } from "@nestjs/graphql";

// Roles del sistema: se usan con @CurrentUser([ValidRoles.admin]) para controlar acceso
export enum ValidRoles {
    admin = 'admin',
    user = 'user',
    superUser = 'superUser',
}

registerEnumType(ValidRoles, { name: 'ValidRoles', description: 'Valid roles in the system' })