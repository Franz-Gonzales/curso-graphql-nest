import { Args, Float, Int, Parent, Query, Resolver } from '@nestjs/graphql';

@Resolver() // Resolver es como un controlador pero para GraphQL, se encarga de resolver las consultas y mutaciones definidas en el esquema GraphQL
export class HelloWorldResolver {
    @Query(() => String, { description: 'Devuelve un saludo de bienvenida', name: 'HolaMundo' })
    helloWorld(): string {
        return 'Hello World!';
    }

    @Query(() => Float, { name: 'NumberRandom' })
    numberRandom(): number {
        return Math.random() * 100
    }

    @Query(() => Int, { name: 'RandomNumberEntero' })
    randomNumberEntero(@Args('to', { type: () => Int, nullable: true }) to: number = 10): number {
        return Math.floor(Math.random() * to);
    }
}
