import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';
import { AggregationsType } from './dto/types/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {

    constructor(
        private readonly todoService: TodoService
    ) { }

    @Query(() => [Todo], { name: 'todos' })
    getAll(@Args() statusArgs: StatusArgs) {
        return this.todoService.getAll(statusArgs);
    }

    @Query(() => Todo, { name: 'todo' })
    getOne(@Args('id', { type: () => Int }) id: number) {
        return this.todoService.getOne(id);
    }

    @Mutation(() => Todo, { name: 'createTodo' })
    createTodo(
        @Args('data') createTodoInput: CreateTodoInput
    ) {
        return this.todoService.createTodo(createTodoInput);
    }

    @Mutation(() => Todo, { name: 'updateTodo' })
    updateTodo(
        @Args('dataUpdate') updateTodoInpur: UpdateTodoInput
    ) {
        return this.todoService.updateTodo(updateTodoInpur);
    }

    @Mutation(() => Boolean, { name: 'deleteTodo' })
    deleteTodo(
        @Args('id', { type: () => Int }) id: number
    ): boolean {
        return this.todoService.deleteTodo(id);
    }

    @Query(() => Int, { name: 'totalTodos' })
    getTotalTodos() {
        return this.todoService.getTotalTodos;
    }

    @Query(() => Int, { name: 'completeTodos' })
    getCompleteTodos() {
        return this.todoService.getCompleteTodos;
    }

    @Query(() => Int, { name: 'pendingTodos' })
    getPendingTodos() {
        return this.todoService.getPendingTodos;
    }

    @Query(() => AggregationsType, { name: 'aggregations' })
    aggregationsType(): AggregationsType {
        return {
            total: this.todoService.getTotalTodos,
            completed: this.todoService.getCompleteTodos,
            pending: this.todoService.getPendingTodos
        }
    }
}
