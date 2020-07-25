import Vue from 'vue';

// ローカルストレージAPIを使用する
const STORAGE_KEY = 'todo_vue';
let todoStorage = {
  fetch: function() {
    let todos = JSON.parse(
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
    addTask() {
      let text = this.$refs.text;
      if (!text.value.length) {
        return;
      }
      this.todos.push({
        id: todoStorage.uid++,
        text: text.value,
        state: 0,
        isEdit: false
      });
      text.value = '';
    },
    toggleTask(item) {
      item.state = item.state ? 0 : 1;
    },
    removeTask(item) {
      let index = this.todos.indexOf(item);
      this.todos.splice(index, 1);
    }
  },
  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos);
      },
      deep: true
    }
  },
  created() {
    this.todos = todoStorage.fetch();
  }
});