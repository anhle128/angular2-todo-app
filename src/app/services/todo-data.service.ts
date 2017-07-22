import { Injectable } from '@angular/core';
import * as _ from 'lodash'

import storageHelper from '../helpers/storage.helper';
import { Todo } from '../models/todo';

@Injectable()
export class TodoDataService {

  todos: Todo[];

  constructor() {
    this.todos = storageHelper.getTodos();
  }

  addTodo(todo: Todo): TodoDataService {
    todo.id = this.todos.length;
    this.todos.push(todo);
    storageHelper.saveTodos(this.todos);
    return this;
  }

  deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
    storageHelper.saveTodos(this.todos);
    return this;
  }

  updateTodoById(id: number, values: Object = {}): Todo {
    const todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    storageHelper.saveTodos(this.todos);
    return todo;
  }

  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  getTodos(selectMode: string): Todo[] {
    if (selectMode === 'all') {
      return this.todos
    } else if (selectMode === 'complete') {
      return _.filter(this.todos, a => a.complete === true);
    } else {
      return _.filter(this.todos, a => a.complete === false);
    }
  }

  todoComplete(todo: Todo) {
    const updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }

}
