import { Todo } from '../models/todo';

function getTodos (): Todo[] {
  const stringData = localStorage.getItem('todo');
  if (!stringData) {
    return [];
  }
  const resultData = JSON.parse(stringData);
  return resultData;
}

function saveTodos (todoDatas: Todo[]) {
  localStorage.setItem('todo', JSON.stringify(todoDatas));
}

export default {
  getTodos,
  saveTodos
}
