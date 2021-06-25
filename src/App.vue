

<script>
  import {auth} from './firebase'

  console.log(auth);

  export default {
    name: 'App',
  }
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
label, input, button {
  display: block;
}

</style>

