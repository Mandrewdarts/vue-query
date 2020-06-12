export function getUsers() {
  return fetch("https://jsonplaceholder.typicode.com/users").then(res =>
    res.json()
  );
}

export function getUser(id: string) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(res =>
    res.json()
  );
}

export function getUserTodos(id: string) {
  return fetch(
    `https://jsonplaceholder.typicode.com/users/${id}/todos`
  ).then(res => res.json());
}
