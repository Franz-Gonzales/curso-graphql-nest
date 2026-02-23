import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

@InputType()
export class CreateTodoInput{

    @Field(() => String, {description: 'The description of the todo'})
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    description: string;
}