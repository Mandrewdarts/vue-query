<template>
  <div id="app">
    <button @click="refetch()">Refresh</button>
    <button @click="refetch(true)">Force Refresh</button>
    <span v-if="loading">Loading...</span>
    <ul v-if="data">
      <li v-for="user in data" :key="user.id">
        <span>{{ user.name }}</span>
        <button @click="selectedUser.id = user.id">View User Info</button>
      </li>
    </ul>

    <User v-if="selectedUser.id" :id="selectedUser.id" :key="selectedUser.id" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import User from "./components/User.vue";
import { useQuery } from "./hooks/vue-query";
import { reactive } from "@vue/composition-api";
import { getUsers } from "./services";

export default Vue.extend({
  name: "App",
  components: {
    User
  },

  setup() {
    const selectedUser = reactive({ id: null });

    const { loading, data, refetch } = useQuery("users", getUsers, {
      cacheFor: 1000 * 5
    });

    return {
      loading,
      data,
      refetch,
      selectedUser
    };
  }
});
</script>
