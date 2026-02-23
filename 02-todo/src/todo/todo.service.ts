import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';

@Injectable()
export class TodoService {
    private todos: Todo[] = [
        { id: 1, description: 'Hacer la compra', done: false },
        { id: 2, description: 'Limpiar la casa', done: true },
        { id: 3, description: 'Estudiar NestJS', done: false },
        { id: 4, description: 'Hacer ejercicio', done: true },
    ];

    get getTotalTodos(): number {
        return this.todos.length;
    }

    get getCompleteTodos(): number{
        return this.todos.filter(todo => todo.done === true).length;
    }
    
    get getPendingTodos(): number{
        return this.todos.filter(todo => todo.done === false).length;
    }

    getAll(statusArgs: StatusArgs): Todo[] {
        if (statusArgs.status !== undefined) {
            return this.todos.filter(todo => todo.done === statusArgs.status);
        }
        return this.todos;
    }

    getOne(id: number): Todo {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);

        return todo;
    }

    createTodo(createTodoInput: CreateTodoInput): Todo {
        const todo = new Todo();
        todo.id = Math.max(...this.todos.map(todo => todo.id), 0) + 1;
        todo.description = createTodoInput.description;
        todo.done = false;

        this.todos.push(todo);

        return todo;
    }

    updateTodo(updateTodoInput: UpdateTodoInput): Todo {
        const todo = this.getOne(updateTodoInput.id);

        if (updateTodoInput.description) todo.description = updateTodoInput.description;
        if (updateTodoInput.done !== undefined) todo.done = updateTodoInput.done;

        this.todos = this.todos.map(t => t.id === todo.id ? todo : t);

        return todo;
    }

    deleteTodo(id: number) : boolean {
        const todo = this.getOne(id);
        this.todos = this.todos.filter(t => t.id !== todo.id);
        return true;
    }
}
