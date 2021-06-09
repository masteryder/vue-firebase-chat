<script>
  import HelloWorld from '../components/HelloWorld.vue'
  import Login from '../components/01-atoms/Login.vue'
  import User from '../components/User.vue'

  export default{
    components: {
      HelloWorld,
      Login,
      User
    }
  }



</script>

<template>
  <h3>Home</h3>
  <User>
    <template v-slot:user="{user}">
      <div v-if="user">
        Logged-in as {{user.uid}}
      </div>
      <Login v-else />
    </template>
  </User>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>