import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {

  private todos: Todo[] = [
    { id: 1, description: 'Learn NestJS', done: false },
    { id: 2, description: 'Build a REST API', done: false },
    { id: 3, description: 'Write unit tests', done: true },
  ];

  create(createTodoDto: CreateTodoDto): Todo {
    const todo = new Todo();
    todo.id = this.todos.length > 0 ? Math.max(...this.todos.map(t => t.id)) + 1 : 1;
    todo.description = createTodoDto.description;

    this.todos.push(todo);
    return todo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find( todo => todo.id === id);

    if(!todo) throw new NotFoundException(`Todo with id ${id} not found`);
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const {description, done} = updateTodoDto;

    const todo = this.findOne(id);
    if( done !== undefined) todo.done = done;
    if( description) todo.description = description;

    this.todos = this.todos.map( t => t.id === id ? todo : t);
    return todo;
  }

  remove(id: number) {
    this.findOne(id);
    this.todos = this.todos.filter(t => t.id !== id);
    return { message: `Todo with id ${id} removed`};
  }
}
