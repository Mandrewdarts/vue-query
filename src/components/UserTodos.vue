<template>
  <div>
    <span v-if="loading">Loading Todos for {{ user.name }}...</span>
    <div v-if="todos">
      <ul>
        <li v-for="todo of todos" :key="todo.id">{{ todo.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { useQuery } from "../hooks/vue-query";
import { getUserTodos } from "../services";
export default Vue.extend({
  props: ["user"],
  setup(props: any) {
    const { data, error, loading } = useQuery(
      ["users", props.user.id, "todos"],
      ([_, userId]) => getUserTodos(userId)
    );
    return {
      todos: data,
      loading,
      error
    };
  }
});
</script>
