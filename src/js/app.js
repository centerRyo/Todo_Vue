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
    todos: [],
    options: [
      { value: -1, label: 'すべて' },
      { value: 0, label: '未完了' },
      { value: 1, label: '完了' },
    ],
    current: -1,
    errors: '',
    searchText: ''
  },
  methods: {
    addTask() {
      let text = this.$refs.text;
      if (!text.value.length) {
        this.errors = '入力してください';
        return;
      }
      this.todos.push({
        id: todoStorage.uid++,
        text: text.value,
        state: 0,
        editMode: false
      });
      text.value = '';
      this.errors = '';
    },
    toggleTask(item) {
      item.state = item.state ? 0 : 1;
    },
    removeTask(item) {
      let index = this.todos.indexOf(item);
      this.todos.splice(index, 1);
    },
    showEditTask(item) {
      item.editMode = true;
    },
    closeEditTask(item) {
      item.text = item.text;
      item.editMode = false;
    }
  },
  computed: {
    filterTodos: function() {
      // 完了未完了で検索
      let data = this.todos.filter((el) => {
        return this.current < 0 ? true : this.current === el.state;
      });

      // 検索ワードで検索
      const regexp = new RegExp('^' + this.searchText, 'i');
      return data.filter(function(elm) {
        return elm.text.match(regexp);
      });
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
