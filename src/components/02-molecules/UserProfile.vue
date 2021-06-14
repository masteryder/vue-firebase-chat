<template>
  Logged in as {{user.email ? user.email : user.uid}}
  <button @click="auth.signOut()">Sign Out</button>
</template>

<script>
  import {auth} from '../../firebase';
  export default {
    data() {
      return {
        auth
      }
    },
    props: ['user']
  }
</script>