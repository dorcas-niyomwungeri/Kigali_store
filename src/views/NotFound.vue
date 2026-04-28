<template>
  <div class="notfound">
    <h1>404</h1>
    <p>Page Not Found</p>

    <router-link to="/">Go Home</router-link>
  </div>
</template>

<style>
.notfound {
  text-align: center;
  margin-top: 100px;
}

h1 {
  font-size: 60px;
  color: red;
}

a {
  display: inline-block;
  margin-top: 20px;
  color: blue;
}
</style>