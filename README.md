# vue-query

Heavily inspired by https://github.com/tannerlinsley/react-query
An attempt to bring similar functionality to a Vue library.

> Heads up, this is using the new Vue composition api.
> Check out more here [https://composition-api.vuejs.org/]()

## Simple Use
Simply pass the `useQuery` function a cache key and a function that returns a promise.
```ts
function getUsers() {
    return fetch('your-api.com/users').then(res => res.json())
}
const { loading, data, error, refetch } = useQuery("users", getUsers);

// loading - tells the loading state
// data - holds the response data
// error - holds any error returned
// refetch - a function to refetch the data, by default this will serve cached data. There is an override param to bypass the cache. Ex. refetch(true) 
```

## One Step Further
Sometime you will need to pass params to you fetcher function, for this you can use the array syntax. This array will be passed into the fetcher function as an array.
```ts
function getUser(id) {
    return fetch(`your-api.com/users/${id}`).then(res => res.json())
}
const { loading, data, error, refetch } = useQuery(
    ["users", 1], 
    ([_ /* "users" */, id /* 1 */]) => getUser(id)
);
```


## Full Example
```html
<template>
  <div id="app">
    <button @click="refetch()">Refresh</button>
    <button @click="refetch(true)">Force Refresh</button>
    <span v-if="loading">Loading...</span>
    <ul v-if="data">
      <li v-for="user in data" :key="user.id">
        <span>{{ user.name }}</span>
        <button @click="selectedUser.id = user.id">
            View User Info
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { useQuery } from "./hooks/vue-query";
import { getUsers } from "./services";

export default Vue.extend({
  name: "App",

  setup() {
    const { loading, data, refetch } = useQuery("users", getUsers);

    return {
      loading,
      data,
      refetch,
      selectedUser
    };
  }
});
</script>

```