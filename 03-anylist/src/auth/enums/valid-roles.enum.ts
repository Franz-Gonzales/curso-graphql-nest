// Roles del sistema: se usan con @CurrentUser([ValidRoles.admin]) para controlar acceso
export enum ValidRoles {
    admin = 'admin',
    user = 'user',
    superUser = 'superUser',
}