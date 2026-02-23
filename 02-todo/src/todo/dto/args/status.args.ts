import { ArgsType, Field } from "@nestjs/graphql";
import { IsBoolean, IsOptional } from "class-validator";


@ArgsType()
export class StatusArgs {

    @Field(() => Boolean , { description: 'The status of the todo', nullable: true})
    @IsBoolean()
    @IsOptional()
    status?: boolean;
}