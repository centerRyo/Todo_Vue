import Vue from 'vue';

// ローカルストレージAPIを使用する
var STORAGE_KEY = 'todo_vue';
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    );
    todos.forEach(function(todo, index) {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
}

new Vue({
  el: '#app',
  data: {
    todos: []
  },
  methods: {

  }
});