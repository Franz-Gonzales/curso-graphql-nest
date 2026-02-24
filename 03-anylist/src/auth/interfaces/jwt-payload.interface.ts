
// Estructura del payload decodificado del JWT
// id y email los definimos nosotros; iat y exp los agrega JwtService automáticamente
export interface JwtPayload {
    id: string;     // UUID del usuario
    email: string;
    iat: number;    // Issued At: cuándo se creó el token
    exp: number;    // Expiration: cuándo expira el token
}