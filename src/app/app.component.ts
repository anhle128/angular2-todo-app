import { Component, OnInit } from '@angular/core';
import { Todo } from './models/todo';
import { TodoDataService } from './services/todo-data.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  newTodo: Todo;
  todos: Todo[];
  selectedTodoMode; // ['all', 'complete', 'uncomplete']

  constructor(private todoDataService: TodoDataService) {
    this.newTodo = new Todo('', false);
  }

  addTodoListener() {
    this.todoDataService.addTodo(this.newTodo);
    this.loadTodo();
    this.newTodo = new Todo('', false);
  }

  todoCompleteListener(todo: Todo) {
    this.todoDataService.todoComplete(todo);
    this.loadTodo();
  }

  removeTodoListener(todo: Todo) {
    this.todoDataService.deleteTodoById(todo.id);
    this.loadTodo();
  }

  onChangeSelectMode() {
    this.loadTodo();
    console.log(this.selectedTodoMode);
  }

  ngOnInit() {
    this.selectedTodoMode = 'all';
   this.loadTodo();
  }

  loadTodo() {
    this.todos = this.todoDataService.getTodos(this.selectedTodoMode);
  }

}
