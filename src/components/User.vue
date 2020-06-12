<template>
  <div>
    <div v-if="!loading && user">
      <table style="text-align: left; background-color: #eee; padding: 8px">
        <thead>
          <th>Name</th>
          <th>Email</th>
        </thead>

        <tbody>
          <tr>
            <td style="width: 200px">{{ user.name }}</td>
            <td>{{ user.email }}</td>
          </tr>
        </tbody>
      </table>

      <UserTodos :user="user" />

      <button @click="() => refetch()">Refresh</button>
      <button @click="() => refetch(true)">Force Refresh</button>
    </div>
    <div v-if="loading">Loading User {{ id }}...</div>
    <div v-if="error">
      <pre>{{ error }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import UserTodos from "./UserTodos.vue";
import { useQuery } from "../hooks/vue-query";
import { getUser } from "../services";

export default {
  props: ["id"],
  components: {
    UserTodos
  },

  setup(props: { [key: string]: any }) {
    const { loading, data, refetch, error } = useQuery(
      ["user", props.id],
      ([_, id]) => getUser(id),
      { retryDelay: 3000, retryTimes: 10 }
    );

    return {
      loading,
      user: data,
      refetch,
      error
    };
  }
};
</script>
